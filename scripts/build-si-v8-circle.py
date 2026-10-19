"""Recover the user-selected thin circle S from the supplied raster-only PDF, page 8."""
from pathlib import Path
from io import BytesIO
import json,hashlib,base64
import fitz,cv2,numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/symbol-circle';O.mkdir(parents=True,exist_ok=True)
Q=R/'qa-local/v8';Q.mkdir(parents=True,exist_ok=True)
source=Path('C:/Users/Caio Imori/Downloads/Idv_SNPS.pdf');doc=fitz.open(source);page=doc[7];raw=doc.extract_image(page.get_images()[0][0]);im=Image.open(BytesIO(raw['image'])).convert('RGB')
# The central white-on-dark symbol is the thin variant, not the thicker page-6 variant.
sx=im.width/page.rect.width;sy=im.height/page.rect.height;box=(round(850*sx),round(420*sy),round(1080*sx),round(650*sy));roi=np.array(im)[box[1]:box[3],box[0]:box[2]]
binary=(cv2.cvtColor(roi,cv2.COLOR_RGB2GRAY)>150).astype(np.uint8)*255
contours,hierarchy=cv2.findContours(binary,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE);outer=max(range(len(contours)),key=lambda i:cv2.contourArea(contours[i]));child=int(hierarchy[0,outer,2]);assert child>=0
x,y,w,h=cv2.boundingRect(contours[outer]);assert .98<w/h<1.02
curve=cv2.approxPolyDP(contours[child],.8,True).reshape(-1,2);scale=1000/((w+h)/2);cx=x+(w-1)/2;cy=y+(h-1)/2
points=[((float(px)-cx)*scale+500,(float(py)-cy)*scale+500) for px,py in curve]
mids=[((points[i][0]+points[(i+1)%len(points)][0])/2,(points[i][1]+points[(i+1)%len(points)][1])/2) for i in range(len(points))]
hole=f'M{mids[-1][0]:.4f} {mids[-1][1]:.4f} '+ ' '.join(f'Q{point[0]:.4f} {point[1]:.4f} {mids[i][0]:.4f} {mids[i][1]:.4f}' for i,point in enumerate(points))+' Z';shape='M500 0 A500 500 0 1 1 500 1000 A500 500 0 1 1 500 0 Z '+hole
materials=json.loads((R/'data/si/materials.json').read_text(encoding='utf8'))['definitions']
for theme in ['dark','light']:
    fg='#f5f5f5' if theme=='dark' else '#111111'
    for material in ['solid','glass','silver','frost']:
        fill=fg if material=='solid' else f'url(#si-{material})'
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000"><title>S circular fino / original fornecido, página 8</title><desc>Contorno recuperado da imagem incorporada ao Idv_SNPS.pdf. O PDF não contém o vetor Bézier original.</desc><defs>{materials[theme]}</defs><path d="{shape}" fill="{fill}" fill-rule="evenodd"/></svg>'
        (O/f'{material}-{theme}.svg').write_text(svg,encoding='utf8',newline='\n')
single=fitz.open();single.insert_pdf(doc,from_page=7,to_page=7);single.save(O/'source-page-08.pdf',garbage=4,deflate=True)
meta={'selected_by_user':'2026-10-19','name':'S circular fino','source':'Idv_SNPS.pdf','source_page':8,'source_pdf_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'source_image_pixels':[im.width,im.height],'source_type':'raster image embedded in PDF; original Bezier paths unavailable','method':'source contour extraction, 0.8 source-pixel simplification with quadratic midpoint smoothing; analytic circular exterior','hole_points':len(points),'shape':shape,'status':'user_selected_existing_symbol; extracted outline for production review','native_original_vector_recovered':False}
(O/'source.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
Image.fromarray(roi).save(Q/'circle-source-region.png')
print('Selected page-8 thin circular S recovered; source raster explicitly documented.')
