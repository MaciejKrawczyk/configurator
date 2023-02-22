import cadquery as cq
from cadquery.occ_impl import exporters


result2 = cq.Workplane("left").circle(20)
result = (cq.Workplane("front")
          .transformed(offset=cq.Vector(-1, 20, 0))
          .lineTo(5.0, 0)
          .lineTo(5.0, 1.0)
          .threePointArc((1.0, 1.5), (0.0, 1.0))
          .close()
          .sweep(result2)
          )

exporters.export(result, '../ring.amf')
