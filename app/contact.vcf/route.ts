import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const dynamic = 'force-static'

const fold = (line: string) => line.match(/.{1,74}/g)!.join('\r\n ')

export async function GET() {
  const photo = (await readFile(path.join(process.cwd(), 'public/official/apple-touch-icon.png'))).toString('base64')
  const lines = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'N:Pierce;Brian;;;', 'FN:Brian Pierce',
    'ORG:Coastal Solutions Media', 'TITLE:President / CEO',
    'TEL;TYPE=CELL,VOICE,pref:+16784165997',
    'EMAIL;TYPE=INTERNET,WORK,pref:brian@coastalsolutionsmedia.com',
    'item1.URL:https://www.coastalsolutionsmedia.com/', 'item1.X-ABLabel:Coastal Solutions Media',
    'item2.URL:https://www.coastaflow.ai/', 'item2.X-ABLabel:CoastaFlow.AI',
    'item3.URL:https://www.lowcountryunscripted.com/', 'item3.X-ABLabel:Podcast',
    'item4.URL:https://hub.coastalsolutionsmedia.com/', 'item4.X-ABLabel:Links',
    'X-SOCIALPROFILE;TYPE=youtube:https://www.youtube.com/@coastalsolutionsmedia',
    'X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/profile.php?id=61569810494297',
    'X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/coastalsolutionsmedia',
    'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/company/coastalsolutionsmedia/',
    'NOTE:AI and business automation · Free digital audit: https://www.coastalsolutionsmedia.com/free-growth-audit#request · Leave us a review: https://g.page/r/CfYAy-Jna-CUEBM/review · YouTube/Instagram: @coastalsolutionsmedia',
    `PHOTO;ENCODING=b;TYPE=PNG:${photo}`,
    'END:VCARD',
  ]
  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Brian-Pierce-Coastal-Solutions-Media.vcf"',
    },
  })
}
