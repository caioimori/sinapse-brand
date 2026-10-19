"""Build the proprietary display face from the approved SNPS vector, not a substitute font.
Original cubics are preserved in OTF; TTF conversion has <=0.25 font-unit error.
New capitals use selective corner roles: 0 / 4.69 / 9.38 / 2.54, with the measured stroke and gap.
"""
from pathlib import Path
import json, re, base64, math, unicodedata, xml.etree.ElementTree as ET
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.svgLib.path import parse_path

ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'public/si-v2'; F=OUT/'fonts';F.mkdir(exist_ok=True)
H=46.9; W=93.18; T=9.38; R=4.69; GAP=16.64; SCALE=700/H

def rect(x,y,w,h,r=0):
    if not r:return f'M{x} {y}h{w}v{h}h{-w}Z'
    k=.55228475;d=r*k
    return f'M{x+r} {y}H{x+w-r}C{x+w-r+d} {y} {x+w} {y+r-d} {x+w} {y+r}V{y+h-r}C{x+w} {y+h-r+d} {x+w-r+d} {y+h} {x+w-r} {y+h}H{x+r}C{x+r-d} {y+h} {x} {y+h-r+d} {x} {y+h-r}V{y+r}C{x} {y+r-d} {x+r-d} {y} {x+r} {y}Z'
def poly(*points):return 'M'+'L'.join(f'{x} {y}' for x,y in points)+'Z'
def corners(points,radii):
    """Selective circular fillets. A zero radius is an intentional cut terminal.
    Diagonal shoulders use the N's 9.38 outer / 2.54 inner vocabulary.
    Radii are clamped only when two adjacent tangencies would share an edge.
    """
    nodes=[]
    for i,(x,y) in enumerate(points):
        prev=points[i-1];nxt=points[(i+1)%len(points)]
        a=(prev[0]-x,prev[1]-y);b=(nxt[0]-x,nxt[1]-y)
        la=math.hypot(*a);lb=math.hypot(*b);a=tuple(v/la for v in a);b=tuple(v/lb for v in b)
        interior=math.acos(max(-1,min(1,sum(u*v for u,v in zip(a,b)))))
        distance=min(radii[i]/max(math.tan(interior/2),1e-9),la*.5,lb*.5)
        effective=distance*math.tan(interior/2);handle=4/3*math.tan((math.pi-interior)/4)*effective
        entry=(x+a[0]*distance,y+a[1]*distance);leave=(x+b[0]*distance,y+b[1]*distance)
        c1=(entry[0]-a[0]*handle,entry[1]-a[1]*handle);c2=(leave[0]-b[0]*handle,leave[1]-b[1]*handle)
        nodes.append((entry,c1,c2,leave,distance))
    f=lambda p:f'{p[0]:.6f} {p[1]:.6f}'
    d='M'+f(nodes[0][0])
    for i,node in enumerate(nodes):
        en,c1,c2,le,dist=node
        if i:d+='L'+f(en)
        if dist:d+='C'+f(c1)+' '+f(c2)+' '+f(le)
    return d+'Z'
def box(x,y,w,h,radii):return corners([(x,y),(x+w,y),(x+w,y+h),(x,y+h)],radii)
def bowl_counter(y,h):return reverse(box(T,y,W-2*T,h,[0,R,R,0]))
def reverse(d):
    from fontTools.pens.reverseContourPen import ReverseContourPen
    p=SVGPathPen(None);parse_path(d,ReverseContourPen(p));return p.getCommands()
def ring(x=0,y=0,w=W,h=H):return rect(x,y,w,h,R)+reverse(rect(x+T,y+T,w-2*T,h-2*T,R))
def bounds(d):
    p=BoundsPen(None);parse_path(d,p);return p.bounds
def transform(d,m):
    p=SVGPathPen(None);parse_path(d,TransformPen(p,m));return p.getCommands()

# The I is a rect in the source. The former path-only extractor silently dropped it.
src=ET.parse(ROOT/'public/brand/logo/vanta/sinapse-wordmark.svg').getroot(); pieces=[]
for el in src:
    kind=el.tag.split('}')[-1]
    if kind=='path':pieces.append(re.sub(r'\s+','',el.get('d','')))
    elif kind=='rect':pieces.append(rect(*[float(el.get(k,'0')) for k in ['x','y','width','height']]))
assert len(pieces)==7, 'SINAPSE must contain seven geometric letters, including I'
word=''.join(f'<path d="{d}"/>' for d in pieces)
masters=json.loads((ROOT/'public/si/masters.json').read_text(encoding='utf8'));masters['wordmark']=word
(ROOT/'public/si/masters.json').write_text(json.dumps(masters,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
masterfile=ROOT/'lib/si/master.ts';s=masterfile.read_text(encoding='utf8');s=re.sub(r'export const WORDMARK_PATHS = .*?;\n',lambda _: 'export const WORDMARK_PATHS = '+json.dumps(word)+';\n',s,flags=re.S);masterfile.write_text(s,encoding='utf8',newline='\n')
glyph={};widths={};originals={}
for char,d in zip('SINAPSE',pieces):
    x,y,x2,y2=bounds(d);n=transform(d,(1,0,0,1,-x,-33.28))
    if char not in glyph:glyph[char]=n;widths[char]=round(x2-x,5);originals[char]=n
# Standard stroke and radii extend the approved alphabet; S I N A P E are master outlines.
glyph.update({
'B':rect(0,0,W,H,R)+reverse(rect(T,T,W-2*T,T,R))+reverse(rect(T,3*T,W-2*T,T,R)),
'C':f'M{W} 0H{R}Q0 0 0 {R}V{H-R}Q0 {H} {R} {H}H{W}V{H-T}H{T}V{T}H{W}Z',
'D':rect(0,0,W,H,9.38)+reverse(rect(T,T,W-2*T,H-2*T,R)),
'F':rect(0,0,T,H)+rect(T,0,W-T,T)+rect(T,2*T,W-T,T),
'G':f'M{W} 0H{R}Q0 0 0 {R}V{H-R}Q0 {H} {R} {H}H{W-R}Q{W} {H} {W} {H-R}V{2*T}H{W/2}V{3*T}H{W-T}V{H-T}H{T}V{T}H{W}Z',
'H':rect(0,0,T,H)+rect(W-T,0,T,H)+rect(T,2*T,W-2*T,T),
'J':f'M{W-T} 0H{W}V{H-R}Q{W} {H} {W-R} {H}H{R}Q0 {H} 0 {H-R}V{H-2*T}H{T}V{H-T}H{W-T}Z',
'K':rect(0,0,T,H)+poly((T,H/2-T/2),(W-18,0),(W,0),(W/2,H/2),(W,H),(W-18,H),(T,H/2+T/2)),
'L':rect(0,0,T,H)+rect(T,H-T,W-T,T),
'M':poly((0,H),(0,0),(T,0),(W/2,H-16),(W-T,0),(W,0),(W,H),(W-T,H),(W-T,17),(W/2,H),(T,17),(T,H)),
'O':ring(),
'Q':ring()+poly((W-28,H-20),(W-20,H-24),(W+2,H),(W-10,H)),
'R':None,
'T':rect(0,0,W,T)+rect((W-T)/2,T,T,H-T),
'U':f'M0 0H{T}V{H-T}H{W-T}V0H{W}V{H-R}Q{W} {H} {W-R} {H}H{R}Q0 {H} 0 {H-R}Z',
'V':poly((0,0),(12,0),(W/2,H-12),(W-12,0),(W,0),(W/2+6,H),(W/2-6,H)),
'W':poly((0,0),(T,0),(T,H-17),(W/2,0),(W-T,H-17),(W-T,0),(W,0),(W,H),(W-T,H),(W/2,16),(T,H),(0,H)),
'X':poly((0,0),(18,0),(W/2,H/2-7),(W-18,0),(W,0),(W/2+10,H/2),(W,H),(W-18,H),(W/2,H/2+7),(18,H),(0,H),(W/2-10,H/2)),
'Y':poly((0,0),(16,0),(W/2,H/2-5),(W-16,0),(W,0),(W/2+T/2,H/2+4),(W/2+T/2,H),(W/2-T/2,H),(W/2-T/2,H/2+4)),
'Z':poly((0,0),(W,0),(W,T),(17,H-T),(W,H-T),(W,H),(0,H),(0,H-T),(W-17,T),(0,T)),
})
glyph['R']=glyph['P']+poly((W/2,3*T),(W/2+17,3*T),(W,H),(W-17,H))
glyph.update({'0':ring(),'1':rect(0,0,T,H),'2':glyph['Z'],'3':rect(0,0,W,H,R)+reverse(rect(0,T,W-T,T,R))+reverse(rect(0,3*T,W-T,T,R)),
'4':rect(0,0,T,3*T)+rect(T,2*T,W-2*T,T)+rect(W-T,0,T,H),'5':glyph['S'],'6':ring()+rect(W-T,0,T,2*T),
'7':poly((0,0),(W,0),(W,T),(W/2+10,H),(W/2-4,H),(W-16,T),(0,T)),
'8':rect(0,0,W,H,R)+reverse(rect(T,T,W-2*T,T,R))+reverse(rect(T,3*T,W-2*T,T,R)),
'9':transform(ring()+rect(W-T,0,T,2*T),(-1,0,0,-1,W,H)),
'.':rect(0,H-T,T,T,R/2),',':poly((0,H-T),(T,H-T),(T,H+4),(0,H+12)),':':rect(0,T,T,T,R/2)+rect(0,3*T,T,T,R/2),
';':rect(0,T,T,T,R/2)+poly((0,3*T),(T,3*T),(T,H+4),(0,H+12)),
'-':rect(0,2*T,40,T),'–':rect(0,2*T,65,T),'—':rect(0,2*T,W,T),'_':rect(0,H-T,W,T),
'+':rect(0,2*T,46.9,T)+rect(18.76,0,T,H),'/':poly((W/2-10,H),(W/2,0),(W/2+10,0),(W/2,H)),
'!':rect(0,0,T,3*T)+rect(0,H-T,T,T), '?':f'M0 0H{W-R}Q{W} 0 {W} {R}V{2*T}H{W/2+T/2}V{3.3*T}H{W/2-T/2}V{T}H{W-T}V{T/2}H0Z'+rect(W/2-T/2,H-T,T,T),
'(':f'M{2*T} 0H{T}Q0 {H/2} {T} {H}H{2*T}Q{T} {H/2} {2*T} 0Z',
')':f'M0 0H{T}Q{2*T} {H/2} {T} {H}H0Q{T} {H/2} 0 0Z',
'[':rect(0,0,T,H)+rect(T,0,T,T)+rect(T,H-T,T,T),']':rect(T,0,T,H)+rect(0,0,T,T)+rect(0,H-T,T,T),
'=':rect(0,T,46.9,T)+rect(0,3*T,46.9,T),
'"':rect(0,0,T,2*T)+rect(2*T,0,T,2*T),"'":rect(0,0,T,2*T),
'&':ring()+poly((W/2,2*T),(W/2+14,2*T),(W,H),(W-14,H)),
'@':ring()+rect(30,17,35,12,R),
'#':rect(14,0,T,H)+rect(42,0,T,H)+rect(0,T,65,T)+rect(0,3*T,65,T),
'%':ring(0,0,25,20)+ring(W-25,H-20,25,20)+poly((15,H),(65,0),(78,0),(28,H)),
'*':rect(0,13,40,8)+rect(16,0,8,36),
})
# Correct open forms (digits 3/6/9) use nonzero-outline contours, no intersecting cutouts.
glyph['3']=f'M0 0H{W-R}Q{W} 0 {W} {R}V{H-R}Q{W} {H} {W-R} {H}H0V{H-T}H{W-T}V{3*T}H{T}V{2*T}H{W-T}V{T}H0Z'
glyph['6']=f'M{W} 0H{R}Q0 0 0 {R}V{H-R}Q0 {H} {R} {H}H{W-R}Q{W} {H} {W} {H-R}V{2*T}H{T}V{T}H{W}Z'+rect(T,3*T,W-2*T,T,R)
glyph['9']=transform(glyph['6'],(-1,0,0,-1,W,H))
# Revision 04: rebuild every new capital from terminal, return and shoulder roles.
# The six master letters above are not altered. Closed bowls inherit A; open
# terminals inherit S/E; left-square bowls inherit P; diagonals inherit N.
glyph.update({
'B':box(0,0,W,H,[0,R,R,0])+bowl_counter(T,T)+bowl_counter(3*T,T),
'C':corners([(W,0),(R,0),(0,R),(0,H-R),(R,H),(W,H),(W,H-T),(T,H-T),(T,T),(W,T)],[0,0,0,0,0,0,0,R,R,0]),
'D':box(0,0,W,H,[0,R,R,0])+bowl_counter(T,H-2*T),
'F':corners([(0,H),(0,0),(W,0),(W,T),(T,T),(T,2*T),(W-R,2*T),(W,2*T+R),(W-R,3*T),(T,3*T),(T,H)],[0,R,0,0,0,0,0,0,0,0,0]),
'G':corners([(W,0),(0,0),(0,H),(W,H),(W,2*T),(W/2,2*T),(W/2,3*T),(W-T,3*T),(W-T,H-T),(T,H-T),(T,T),(W,T)],[0,R,R,R,0,0,0,0,R,R,R,0]),
'H':corners([(0,0),(T,0),(T,2*T),(W-T,2*T),(W-T,0),(W,0),(W,H),(W-T,H),(W-T,3*T),(T,3*T),(T,H),(0,H)],[0,0,R,R,0,0,0,0,R,R,0,0]),
'J':corners([(W-T,0),(W,0),(W,H),(0,H),(0,H-2*T),(T,H-2*T),(T,H-T),(W-T,H-T)],[0,0,R,R,0,0,R,R]),
'K':corners([(0,0),(T,0),(T,H/2-T/2),(W-18,0),(W,0),(W/2,H/2),(W,H),(W-18,H),(T,H/2+T/2),(T,H),(0,H)],[0,0,2.54,0,0,2.54,0,0,2.54,0,0]),
'L':corners([(0,0),(T,0),(T,H-T),(W,H-T),(W,H),(0,H)],[0,0,R,0,0,R]),
'M':corners([(0,H),(0,0),(T+3,0),(W/2,H-14),(W-T-3,0),(W,0),(W,H),(W-T,H),(W-T,16),(W/2+4,H),(W/2-4,H),(T,16),(T,H)],[0,9.38,9.38,2.54,9.38,9.38,0,0,2.54,R,R,2.54,0]),
'O':box(0,0,W,H,[R,R,R,R])+reverse(box(T,T,W-2*T,H-2*T,[R,R,R,R])),
'T':corners([(0,0),(W,0),(W,T),(W/2+T/2,T),(W/2+T/2,H),(W/2-T/2,H),(W/2-T/2,T),(0,T)],[0,0,0,R,0,0,R,0]),
'U':corners([(0,0),(T,0),(T,H-T),(W-T,H-T),(W-T,0),(W,0),(W,H),(0,H)],[0,0,R,R,0,0,R,R]),
'V':corners([(0,0),(13.26,0),(W/2,H-T),(W-13.26,0),(W,0),(W/2+T/2,H),(W/2-T/2,H)],[0,0,2.54,0,0,R,R]),
'W':corners([(0,0),(T,0),(T,H-16),(W/2-4,0),(W/2+4,0),(W-T,H-16),(W-T,0),(W,0),(W,H),(W-T-3,H),(W/2,14),(T+3,H),(0,H)],[0,0,2.54,R,R,2.54,0,0,9.38,9.38,2.54,9.38,9.38]),
'X':corners([(0,0),(18,0),(W/2,H/2-7),(W-18,0),(W,0),(W/2+10,H/2),(W,H),(W-18,H),(W/2,H/2+7),(18,H),(0,H),(W/2-10,H/2)],[0,0,2.54,0,0,2.54,0,0,2.54,0,0,2.54]),
'Y':corners([(0,0),(16,0),(W/2,H/2-5),(W-16,0),(W,0),(W/2+T/2,H/2+4),(W/2+T/2,H),(W/2-T/2,H),(W/2-T/2,H/2+4)],[0,0,2.54,0,0,9.38,0,0,9.38]),
'Z':corners([(0,0),(W,0),(W,T),(17,H-T),(W,H-T),(W,H),(0,H),(0,H-T),(W-17,T),(0,T)],[0,R,R,2.54,0,0,R,R,2.54,0]),
})
# C and F use actual master circular returns rather than chamfered approximations.
glyph['C']=f'M{W} 0H{R}C{R*.448} 0 0 {R*.448} 0 {R}V{H-R}C0 {H-R*.448} {R*.448} {H} {R} {H}H{W}V{H-T}H{T+R}C{T+R*.448} {H-T} {T} {H-T-R*.448} {T} {H-T-R}V{T+R}C{T} {T+R*.448} {T+R*.448} {T} {T+R} {T}H{W}Z'
glyph['F']=f'M0 {H}V{R}C0 {R*.448} {R*.448} 0 {R} 0H{W}V{T}H{T}V{2*T}H{W-R}C{W-R*.448} {2*T} {W} {2*T+R*.448} {W} {2*T+R}C{W} {3*T-R*.448} {W-R*.448} {3*T} {W-R} {3*T}H{T}V{H}Z'
glyph['R']=glyph['P']+corners([(W/2,3*T),(W/2+17,3*T),(W,H),(W-17,H)],[2.54,9.38,0,0])
glyph['Q']=glyph['O']+corners([(W-28,H-20),(W-20,H-24),(W+2,H),(W-10,H)],[2.54,2.54,0,0])
glyph['0']=glyph['O'];glyph['8']=glyph['B'];glyph['2']=glyph['Z']
# Revision 05: optical widths restore identifiable silhouettes. The master
# stroke, cap height, gap and corner roles remain the construction vocabulary.
glyph['K']=corners([(0,0),(T,0),(T,18.76),(43,0),(61,0),(24.8,23.45),(61,H),(43,H),(T,28.14),(T,H),(0,H)],[0,0,2.54,0,0,2.54,0,0,2.54,0,0])
glyph['J']=corners([(0,0),(67,0),(67,H),(0,H),(0,H-2*T),(T,H-2*T),(T,H-T),(67-T,H-T),(67-T,T),(0,T)],[0,0,R,R,0,0,R,R,0,0])
glyph['F']=corners([(0,H),(0,0),(W,0),(W,T),(T,T),(T,2*T),(W-14,2*T),(W-14,3*T),(T,3*T),(T,H)],[0,R,0,0,0,0,0,0,0,0])
glyph['W']=corners([(0,0),(10.8,0),(28,34.3),(47,8),(58,8),(77,34.3),(94.2,0),(105,0),(82,H),(72,H),(52.5,21.5),(33,H),(23,H)],[0,0,2.54,2.54,2.54,2.54,0,0,R,R,2.54,R,R])
glyph['Z']=corners([(0,0),(67,0),(67,T),(18.7,H-T),(67,H-T),(67,H),(0,H),(0,H-T),(48.3,T),(0,T)],[0,R,R,2.54,0,0,R,R,2.54,0])
glyph['2']=glyph['Z']
for ch in 'KJFWZ2':widths[ch]=bounds(glyph[ch])[2]
# Smaller counters in percent use proportionate stroke, independent from primary letter stroke.
glyph['%']=rect(0,0,20,20,R)+reverse(rect(5,5,10,10,2))+rect(70,27,20,20,R)+reverse(rect(75,32,10,10,2))+poly((20,H),(62,0),(74,0),(32,H))
from fontTools.pens.areaPen import AreaPen
def same_direction(d,reference):
    a=AreaPen(None);parse_path(d,a);b=AreaPen(None);parse_path(reference,b)
    return reverse(d) if a.value*b.value<0 else d

# R revision: the diagonal starts in the upper edge of the bowl beam. Its
# unfilleted root overlaps the full beam thickness, removing the detached knee.
R_LEG_WIDTH=15.92
R_LEG=poly((W/2-R_LEG_WIDTH/2,2*T),(W/2+R_LEG_WIDTH/2,2*T),(W,H),(W-R_LEG_WIDTH,H))
glyph['R']=glyph['P']+same_direction(R_LEG,glyph['P'])
glyph.update({'$':glyph['S']+same_direction(rect(W/2-3,-6,6,H+12),glyph['S']),
'€':glyph['C']+same_direction(rect(-4,17,60,5)+rect(-4,27,60,5),glyph['C']),
'<':poly((38,0),(50,0),(12,H/2),(50,H),(38,H),(0,H/2)),
'>':poly((0,0),(12,0),(50,H/2),(12,H),(0,H),(38,H/2)),
'\\':poly((25,0),(37,0),(65,H),(53,H)),
'^':poly((0,20),(12,20),(25,8),(38,20),(50,20),(25,0)),
'`':poly((0,0),(12,0),(22,16),(10,16)),
'{':poly((28,0),(12,0),(12,17),(0,23),(12,29),(12,H),(28,H),(28,H-8),(20,H-8),(20,27),(10,23),(20,19),(20,8),(28,8)),
'|':rect(0,-4,7,H+8),
'}':poly((0,0),(16,0),(16,17),(28,23),(16,29),(16,H),(0,H),(0,H-8),(8,H-8),(8,27),(18,23),(8,19),(8,8),(0,8)),
'~':f'M0 25Q10 7 25 20Q40 34 50 15L56 20Q42 44 25 29Q12 17 6 30Z'})
for char,d in list(glyph.items()):
    x,y,x2,y2=bounds(d);widths.setdefault(char,x2-min(0,x));
for ch in 'abcdefghijklmnopqrstuvwxyz':glyph[ch]=glyph[ch.upper()];widths[ch]=widths[ch.upper()]
accents={'\u0301':poly((W/2-5,-6),(W/2+6,-6),(W/2+22,-18),(W/2+9,-18)),
'\u0300':poly((W/2+5,-6),(W/2-6,-6),(W/2-22,-18),(W/2-9,-18)),
'\u0302':poly((W/2-22,-6),(W/2-10,-6),(W/2,-14),(W/2+10,-6),(W/2+22,-6),(W/2+4,-23),(W/2-4,-23)),
'\u0303':f'M{W/2-23} -7Q{W/2-15} -22 {W/2} -12Q{W/2+12} -4 {W/2+18} -16L{W/2+25} -12Q{W/2+17} 3 {W/2} -6Q{W/2-12} -14 {W/2-17} -3Z',
'\u0308':rect(W/2-18,-16,T,T,2)+rect(W/2+8,-16,T,T,2),
'\u0327':poly((W/2-3,H),(W/2+7,H),(W/2+2,H+7),(W/2+12,H+10),(W/2+8,H+19),(W/2-8,H+19),(W/2-8,H+12),(W/2+1,H+12),(W/2-8,H+8))}
for code in range(192,384):
    ch=chr(code);seq=unicodedata.normalize('NFD',ch)
    if len(seq)==2 and seq[0] in glyph and seq[1] in accents:
        base=seq[0];accent=accents[seq[1]];shift=(widths[base]-W)/2
        glyph[ch]=glyph[base]+transform(accent,(1,0,0,1,shift,0));widths[ch]=widths[base]
glyph[' ']='';widths[' ']=W*.6;glyph['\u00a0']='';widths['\u00a0']=W*.6
names={ch:('space' if ch==' ' else f'uni{ord(ch):04X}') for ch in glyph};order=['.notdef']+list(dict.fromkeys(names.values()))
adv={names[ch]:(round((widths[ch]+GAP)*SCALE),0) for ch in glyph};adv['.notdef']=(round((W+GAP)*SCALE),0)
def build(ttf):
    fb=FontBuilder(1000,isTTF=ttf);fb.setupGlyphOrder(order);fb.setupCharacterMap({ord(ch):name for ch,name in names.items()});paths={names[ch]:d for ch,d in glyph.items()};paths['.notdef']=ring()
    fontglyphs={}
    for name in order:
        if ttf:
            pen=TTGlyphPen(None);target=Cu2QuPen(pen,max_err=.25,reverse_direction=True)
        else:pen=T2CharStringPen(adv[name][0],None);target=pen
        parse_path(paths[name],TransformPen(target,(SCALE,0,0,-SCALE,0,700)))
        fontglyphs[name]=pen.glyph() if ttf else pen.getCharString()
    fb.setupHorizontalMetrics(adv);fb.setupHorizontalHeader(ascent=1060,descent=-340,lineGap=0)
    fb.setupNameTable({'familyName':'SNPS Display','styleName':'Regular','uniqueFontIdentifier':'SINAPSE:SNPSDisplay:1.300','fullName':'SNPS Display Regular','psName':'SNPSDisplay-Regular','version':'Version 1.300','copyright':'Copyright 2026 SINAPSE. Original display extension based on the SINAPSE logo.','description':'Wide uppercase display. Selective cut terminals, circular returns and softened diagonal shoulders. Master S I N A P E retained. Portuguese Latin accents included.'})
    fb.setupOS2(sTypoAscender=1060,sTypoDescender=-340,sTypoLineGap=0,usWinAscent=1060,usWinDescent=340,sCapHeight=700,sxHeight=700,fsType=0)
    if ttf:fb.setupGlyf(fontglyphs)
    else:fb.setupCFF('SNPSDisplay-Regular',{'FullName':'SNPS Display Regular','FamilyName':'SNPS Display','Weight':'Regular'},fontglyphs,{})
    fb.setupPost();fb.setupMaxp();return fb.font
otf=build(False);otf.save(F/'SNPSDisplay-Regular.otf');otf.flavor='woff2';otf.save(F/'SNPSDisplay-Regular.woff2');ttf=build(True);ttf.save(F/'SNPSDisplay-Regular.ttf')
gs=build(False).getGlyphSet()
def outline(value,size=100):
    pen=SVGPathPen(gs);x=0
    for ch in value:
        name=names.get(ch,names.get(ch.upper(),'.notdef'));gs[name].draw(TransformPen(pen,(size/1000,0,0,-size/1000,x,size*.7)));x+=adv[name][0]*size/1000
    return pen.getCommands(),max(0,x-GAP*SCALE*size/1000)
data={'family':'SNPS Display','version':'1.000','capHeight':700,'unitsPerEm':1000,'stroke':140,'returnRadius':70,'outerShoulderRadius':140,'innerReturnRadius':round(2.54*SCALE,3),'tracking':round(GAP*SCALE,3),'sourceStroke':T,'sourceRadius':R,'sourceGap':GAP,'glyphs':len(order),'coverage':''.join(glyph),'lowercase':'Uppercase forms','masterLetters':'SINAPE','status':'Custom extension for review; master outlines preserved.','metrics':{ch:adv[names[ch]][0]/1000 for ch in glyph},'outlines':{ch:outline(ch,100)[0] for ch in glyph}}
data.update({'version':'1.300','cornerGrammar':{'terminal':{'radius':0,'source':'I, P lower-left, S open ends, N open ends'},'return':{'radius':R,'source':'S, A, P, E circular turns and counters'},'shoulder':{'radius':T,'source':'N outer vertical-to-diagonal transitions'},'innerKnee':{'radius':2.54,'source':'N inner stem-to-horizontal return'}},'construction':'Selective per-corner radii; square terminals retained. Diagonal extensions are interpretations, not recovered original glyphs.'})
(F/'SNPSDisplay-spec.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
(ROOT/'lib/si/display-font.ts').write_text('export const DISPLAY_METRICS:Record<string,number> = '+json.dumps(data['metrics'],ensure_ascii=False)+';\nexport const DISPLAY_PATHS:Record<string,string> = '+json.dumps(data['outlines'],ensure_ascii=False)+';\n',encoding='utf8',newline='\n')
(F/'SNPSDisplay-LICENSE.txt').write_text('SNPS Display — SINAPSE, 2026.\nCustom lettering extension for SINAPSE brand use, including installation, editable compositions and embedding. Not a redistributed third-party font. Existing logo ownership remains with its respective rights holder.\nUppercase display design, including on lowercase keys. Newly drawn letters are a proposal for review.\n',encoding='utf8')
# Supply masters without a material or fixed background; render variants share one material compositor.
(OUT/'geometry.json').write_text(json.dumps({'snps':masters['snps'],'wordmark':word},ensure_ascii=False),encoding='utf8')
(ROOT/'scripts/snps-font-geometry.json').write_text(json.dumps({'glyphs':glyph,'widths':widths,'master':originals},ensure_ascii=False),encoding='utf8')
print(f'SNPS Display: {len(order)} glyphs; OTF + TTF + WOFF2. I recovered from original rect.');

