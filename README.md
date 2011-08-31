gexode
============

Primitive XML generator for node.js

Example:

    var gexode = require(gexode), doc = gexode.doc, elem = gexode.elem;

    var car = doc(elem('car', {wheels: 4}).text('Volvo'));
    car.write(out);

renders as:

    <?xml version='1.0' encoding='UTF-8'?>
    <car wheels='4'>Volvo</car>
