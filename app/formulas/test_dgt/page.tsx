"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Flame,
  Star,
} from "lucide-react";
import { useQuizSounds } from "@/hooks/useQuizSounds";
import { createClient } from "@/lib/supabase/client";


/* 
Preguntas para cambiar 
4,
6,
9,
28,
34,
55,
54,
*/
/* --------------------------------
    DATOS DEL QUIZ
---------------------------------*/
const preguntas = [
  {
    "numero": "1",
    "pregunta": "Al aproximarse a una calzada con resalto o badén, ¿qué precauciones debería de tomar?",
    "opciones": [
      "Aumentar velocidad.",
      "Moderar la velocidad y si fuera preciso detenernos.",
      "Mantener la velocidad."
    ],
    "correcta": 1,
    "explicacion": "Aumentar la velocidad nunca es respuesta correcta, y mantener es el equivalente a no hacer nada. Moderar la velocidad y detenerse si fuera preciso, por lo general, siempre es la respuesta correcta."
  },
  {
    "numero": "2",
    "pregunta": "En caso de lluvia, ¿qué es conveniente hacer?",
    "opciones": [
      "Aumentar la distancia de seguridad con el vehículo que circula delante.",
      "Mantener la distancia de seguridad.",
      "Disminuir la velocidad."
    ],
    "correcta": 0,
    "explicacion": "Si hay alguna circunstancia adversa (lluvia, niebla, nieve), es conveniente dejar más distancia de seguridad para reducir el riesgo."
  },
  {
    "numero": "3",
    "pregunta": "La distracción en la conducción...",
    "opciones": [
      "Es el factor de riesgo que cada vez tiene menos incidencia en la accidentalidad.",
      "Provoca accidentes con heridos, pero no con víctimas mortales.",
      "Causa uno de cada tres accidentes mortales."
    ],
    "correcta": 2,
    "explicacion": "La distracción tiene cada vez más incidencia (por culpa del móvil). Si hay distracción a alta velocidad, puede haber accidentes mortales."
  },
  {
    "numero": "4",
    "pregunta": "¿Es correcto circular con un vehículo cuyas placas de matrícula están ocultas o deterioradas de tal manera que no se puedan leer correctamente? ",
    "opciones": [
      "Sí, siempre que la placa delantera se lea bien",
      "No, el conductor debe comprobar que se lean siempre correctamente.",
      "Sí, siempre que solo circule de día.",
    ],
    "correcta": 1,
    "explicacion": ""
  },
  {
    "numero": "5",
    "pregunta": "¿Cómo afecta el cansancio a la capacidad de reacción?",
    "opciones": [
      "El tiempo de reacción disminuye.",
      "Disminuye la capacidad de reacción.",
      "Aumenta la capacidad de reacción."
    ],
    "correcta": 1,
    "explicacion": "El tiempo de reacción aumenta, y la capacidad de reacción disminuye. Siempre que ponga capacidad disminuye, va a ser buena."
  },
  {
    "numero": "6",
    "pregunta": "En vías interurbanas con tres carriles para el mismo sentido, ¿le está permitido circular por el carril izquierdo a un autobús?",
    "opciones": [
      "Sí",
      "Si, si su longitud supera los siete metros",
      "No, en ningún caso"
    ],
    "correcta": 0,
    "explicacion": ""
  },
  {
    "numero": "7",
    "pregunta": "¿Qué peatones deben ir por la derecha fuera de poblado como norma general?",
    "opciones": [
      "Los que conduzcan un rebaño animal.",
      "Los que empujen o arrastren una motocicleta de dos ruedas.",
      "Las personas con discapacidad que se desplacen en silla de ruedas."
    ],
    "correcta": 2,
    "explicacion": "La persona a cargo de animales es conductor, no peatón. El que arrastra una motocicleta es conductor, no peatón, por lo que no se cuentan como peatones."
  },
  {
    "numero": "8",
    "pregunta": "Un conductor que gira con su vehículo para entrar en otra vía, ¿debe ceder el paso a un peatón que está cruzándola?",
    "opciones": [
      "Sí, aunque no exista un paso para peatones.",
      "No, salvo que exista un paso para peatones.",
      "Solo si el peatón no se da cuenta de la presencia del vehículo."
    ],
    "correcta": 0,
    "explicacion": "El reglamento obliga a ceder el paso a un peatón que ya está cruzando si se está girando a la derecha o izquierda, incluso si no hay paso para peatones."
  },
  {
    "numero": "9",
    "pregunta": "¿Qué elementos se deben revisar con mayor frecuencia para mantener la seguridad del vehículo en un nivel óptimo?",
    "opciones": [
      "Llantas, batería y líquido lavaparabrisas",
      "Neumáticos, suspensión (amortiguadores) y frenos (pastillas y zapatas)",
      "Filtro de aire, dirección, retrovisores y luz interior"
    ],
    "correcta": 1,
    "explicacion": "Si se frena fuerte a mucha velocidad en una curva, el vehículo puede derrapar y salirse de la curva."
  },
  {
    "numero": "10",
    "pregunta": "¿Está permitido circular por una travesía con luces antiniebla encendidas en condiciones normales de visibilidad?",
    "opciones": [
      "Sí.",
      "No.",
      "No, porque en travesía están prohibidas."
    ],
    "correcta": 1,
    "explicacion": "Como norma general, no se pueden llevar las luces antiniebla si no hay niebla, lluvia o nieve."
  },
  {
    "numero": "11",
    "pregunta": "¿Están todos los usuarios de la vía obligados a cumplir las señales de circulación?",
    "opciones": [
      "Sí, excepto los vehículos de urgencia públicos o privados cuando se hallen en ese servicio.",
      "No.",
      "Conductores sí, peatones no."
    ],
    "correcta": 0,
    "explicacion": "Los servicios de urgencia pueden saltarse ciertas normas bajo su responsabilidad cuando están en servicio. Los peatones también deben cumplir las señales."
  },
  {
    "numero": "12",
    "pregunta": "Las personas mayores pueden tener problemas como peatones, especialmente...",
    "opciones": [
      "No, porque tienen más cuidado.",
      "No, en calzadas muy anchas.",
      "Sí, principalmente de orientación cuando no conocen bien las calles."
    ],
    "correcta": 2,
    "explicacion": "Las personas mayores pueden tener problemas de orientación, lo que puede dar lugar a distracciones."
  },
  {
    "numero": "13",
    "pregunta": "Se debe tener más cuidado al adelantar bicicletas con lluvia o viento porque...",
    "opciones": [
      "Tiene preferencia de paso sobre los demás vehículos.",
      "Puede cambiar su trayectoria de repente.",
      "Por seguridad con lluvia y viento tienen prohibido circular por el arcén."
    ],
    "correcta": 1,
    "explicacion": "Las bicicletas son más inestables; el viento puede empujarlas o hacerlas derrapar más fácil."
  },
  {
    "numero": "14",
    "pregunta": "¿Cuál de los siguientes problemas suele afectar a personas mayores como peatones?",
    "opciones": [
      "Tienen mayor dificultad ante imprevistos.",
      "Bordillos de las aceras están demasiado bajos.",
      "Pueden no distinguir bien los colores de los semáforos en vías más anchas."
    ],
    "correcta": 0,
    "explicacion": "Las personas mayores tienen menos capacidad de reacción que una persona joven, lo que les da mayor dificultad ante imprevistos."
  },
  {
    "numero": "15",
    "pregunta": "Entre la dotación obligatoria que debe llevar un turismo, ¿es obligatorio un equipo homologado de extinción de incendios?",
    "opciones": [
      "Sí.",
      "Solo si el turismo tiene más de cinco plazas.",
      "No."
    ],
    "correcta": 2,
    "explicacion": "Los extintores son obligatorios para conjuntos de vehículos (ej. turismo con remolque), no para turismos solos."
  },
  {
    "numero": "16",
    "pregunta": "En caso de niebla, ¿qué debe hacerse para prevenir el empañamiento de los cristales?",
    "opciones": [
      "Circula con las ventanillas abiertas para obtener mayor visibilidad.",
      "Mantenemos el habitáculo bien ventilado.",
      "Poner la calefacción muy alta."
    ],
    "correcta": 1,
    "explicacion": "La ventilación adecuada ayuda a que los cristales no se empañen. Abrir las ventanillas dejaría entrar la niebla al coche."
  },
  {
    "numero": "17",
    "pregunta": "Si la niebla es espesa y el conductor ha encendido luces de corto alcance, antiniebla delantera y trasera, ¿circula correctamente?",
    "opciones": [
      "Sí.",
      "No, la luz de cruce y antiniebla delantera no deben encenderse al mismo tiempo.",
      "No, solo debe encender el corto alcance."
    ],
    "correcta": 0,
    "explicacion": "Con niebla espesa, es obligatorio poner la antiniebla trasera, y la delantera puede ponerse. Se pueden combinar todas las luces delanteras (posición, corto, largo y antiniebla)."
  },
  {
    "numero": "18",
    "pregunta": "Los problemas que afectan a la capacidad de conducir de las personas mayores incluyen la disminución de...",
    "opciones": [
      "Disminución del tiempo de reacción.",
      "Visión únicamente.",
      "Visión y oído."
    ],
    "correcta": 2,
    "explicacion": "El tiempo de reacción siempre aumenta, nunca disminuye. Las personas mayores suelen tener problemas tanto con la visión como con el oído."
  },
  {
    "numero": "19",
    "pregunta": "Si el sistema de navegación GPS es portátil, ¿qué debe hacer el conductor?",
    "opciones": [
      "Utilizar un soporte adecuado para que no se mueva ni se caiga.",
      "Seguir siempre sus instrucciones, aunque estén en contradicción con la señalización.",
      "Colocarlo justo detrás del volante a la altura de los ojos."
    ],
    "correcta": 0,
    "explicacion": "El GPS debe colocarse en un soporte adecuado, donde no estorbe la visión ni el despliegue del airbag. Las señales prevalecen sobre el GPS."
  },
  {
    "numero": "20",
    "pregunta": "Un vehículo especial de reparación de vías que accede a una autopista para realizar obras, ¿cuándo debe encender la señal luminosa V2?",
    "opciones": [
      "No debe encenderse hasta llegar a la zona de obras.",
      "Solo cuando circula entre la puesta y salida del sol.",
      "Desde el momento en que circula por la vía de uso público."
    ],
    "correcta": 2,
    "explicacion": "Debe llevar encendida la señal V2 desde que pisa la autopista."
  },
  {
    "numero": "21",
    "pregunta": "Si está prohibido el adelantamiento, ¿qué distancia se debe dejar con el vehículo de delante?",
    "opciones": [
      "La que, en caso de que este frene bruscamente, permita detenerse sin colisionar con ella (distancia de seguridad).",
      "La que permite al vehículo que circula por detrás adelantar con seguridad.",
      "50 m."
    ],
    "correcta": 0,
    "explicacion": "Si está prohibido adelantar, solo se debe mantener la distancia de seguridad."
  },
  {
    "numero": "22",
    "pregunta": "Tras tomar un medicamento, ¿qué debe tener en cuenta antes de conducir?",
    "opciones": [
      "Nada.",
      "Si ha sido recetado por un médico que no esté caducado en más de 6 meses.",
      "Que puede alterar el estado físico o mental y conviene consultar su efecto con el médico."
    ],
    "correcta": 2,
    "explicacion": "Siempre hay que preguntar y leer el prospecto; se debe consultar al médico o farmacéutico si hay dudas sobre los efectos."
  },
  {
    "numero": "23",
    "pregunta": "En una vía de dos carriles para el mismo sentido, si tras realizar un adelantamiento va a seguir adelantando, ¿puede continuar circulando por el carril izquierdo?",
    "opciones": [
      "No, es obligatorio volver al derecho.",
      "Solo si no molesta indebidamente a vehículos que circulan por detrás a mayor velocidad.",
      "Sí, en todo caso."
    ],
    "correcta": 1,
    "explicacion": "Se puede seguir adelantando, pero si alguien se acerca a mayor velocidad, se debe volver al carril derecho para darle paso."
  },
  {
    "numero": "24",
    "pregunta": "¿Cuál es la velocidad mínima, salvo causa justificada, que deberá circular un turismo por autopista o autovía?",
    "opciones": [
      "60 km/h.",
      "50 km/h.",
      "40 km/h."
    ],
    "correcta": 0,
    "explicacion": "La velocidad mínima en autopista o autovía es siempre 60 km/h para todos los automóviles."
  },
  {
    "numero": "25",
    "pregunta": "¿Puedes deslumbrar con la luz de largo alcance a los vehículos que circulan delante por su mismo carril?",
    "opciones": [
      "No, solo se deslumbra a los que se encuentre de frente.",
      "Sí, por el reflejo de la calzada.",
      "Sí, a través de los espejos retrovisores, por lo que debe cambiar a la luz de corto alcance."
    ],
    "correcta": 2,
    "explicacion": "La luz de largo alcance deslumbra a quien va delante a través de los espejos retrovisores, por lo que hay que cambiarlas."
  },
  {
    "numero": "26",
    "pregunta": "¿Intentar expulsar un insecto del vehículo mientras se conduce es peligroso?",
    "opciones": [
      "Solo si el insecto es una abeja o una avispa.",
      "Sí, porque puede distraer al conductor.",
      "No, porque se tarda menos de un segundo en expulsarlo."
    ],
    "correcta": 1,
    "explicacion": "Mirar alrededor para expulsar un insecto distrae al conductor y aumenta el riesgo de accidente."
  },
  {
    "numero": "27",
    "pregunta": "Cuando un neumático tiene mucho aire (está muy inflado), ¿qué ocurre?",
    "opciones": [
      "Se agarra mejor.",
      "Se desgasta más por los lados.",
      "Se agarra peor."
    ],
    "correcta": 2,
    "explicacion": "Un neumático muy inflado se desgasta por el centro (descartando C) y se agarra peor a la calzada."
  },
  {
    "numero": "28",
    "pregunta": "Es obligatorio encender el alumbrado que corresponda cuando se circule, tanto de día como de noche... ",
    "opciones": [
      "por carreteras convencionales.",
      "por pasos inferiores o tramos de vía afectados por la señal «Túnel»",
      "por un carril reservado a vehículos con alta ocupación (VAO)."
    ],
    "correcta": 1,
    "explicacion": ""
  },
  {
    "numero": "29",
    "pregunta": "¿Al conductor de una moto le está permitido utilizar el teléfono móvil manteniéndolo ajustado entre la cabeza y el casco?",
    "opciones": [
      "Sí.",
      "No, es una infracción que supone tres puntos.",
      "No, es un delito contra la vialidad contemplado en el código penal."
    ],
    "correcta": 1,
    "explicacion": "Utilizar el móvil de esta forma está prohibido y conlleva la pérdida de tres puntos."
  },
  {
    "numero": "30",
    "pregunta": "¿En cuál de las siguientes situaciones los peatones tienen preferencia de paso sobre los conductores?",
    "opciones": [
      "Cuando el conductor circule por proximidades de centros escolares.",
      "Cuando el conductor circule cerca de recintos deportivos en día de especial afluencia.",
      "Cuando el conductor circule por zona peatonal."
    ],
    "correcta": 2,
    "explicacion": "Los peatones tienen preferencia en zonas peatonales."
  },
  {
    "numero": "31",
    "pregunta": "Respecto a la eliminación del alcohol en la sangre, dormir un poco...",
    "opciones": [
      "Acelera la eliminación de alcohol en la sangre.",
      "Permite recuperar rápidamente las capacidades afectadas.",
      "Ralentiza la metabolización del alcohol."
    ],
    "correcta": 2,
    "explicacion": "Cuando se duerme, la metabolización del alcohol se ralentiza."
  },
  {
    "numero": "32",
    "pregunta": "En caso de caída de la carga en la calzada, ¿qué deberá hacer el conductor, en la medida de lo posible?",
    "opciones": [
      "Retirarla de la calzada en el menor tiempo posible.",
      "Proseguir la marcha para avisar del incidente a la policía de tráfico.",
      "Dejar el vehículo atravesado en mitad de la calzada para cortar el tránsito."
    ],
    "correcta": 0,
    "explicacion": "El sentido común dicta intentar retirar la carga lo antes posible."
  },
  {
    "numero": "33",
    "pregunta": "¿Qué deberíamos comprobar en un mantenimiento preventivo?",
    "opciones": [
      "Profundidad de la banda de rodadura únicamente.",
      "Neumáticos, frenos y alumbrados.",
      "Solo líquidos y niveles (inferido)."
    ],
    "correcta": 1,
    "explicacion": "Un mantenimiento preventivo debe incluir la revisión de elementos de seguridad clave como neumáticos, frenos y alumbrados."
  },
  {
    "numero": "34",
    "pregunta": "Como norma general, un conductor que ha consumido cocaína... ",
    "opciones": [
      "es competitivo e impulsivo",
      "es inseguro y conduce con mucha más precaución.",
      "se concentra mejor, por lo que sus decisiones son más seguras"
    ],
    "correcta": 0,
    "explicacion": "Es una señal de obligación que exige seguir tanto el sentido como la dirección indicada por la flecha."
  },
  {
    "numero": "35",
    "pregunta": "Un vehículo que sale de un garaje particular para incorporarse a la circulación, ¿debe ceder el paso?",
    "opciones": [
      "No, porque se incorpora por la derecha.",
      "Solo si el vehículo está destinado al servicio público.",
      "Sí, ya que un vehículo que sale de un sitio privado pierde su preferencia."
    ],
    "correcta": 2,
    "explicacion": "Al salir de un sitio privado (gasolinera, parking, garaje), se debe ceder el paso a todo el mundo."
  },
  {
    "numero": "36",
    "pregunta": "En una carretera convencional, ¿a qué velocidad puede circular como máximo un turismo para adelantar a un camión?",
    "opciones": [
      "90 km/h.",
      "140 km/h.",
      "120 km/h."
    ],
    "correcta": 0,
    "explicacion": "En carretera convencional, la velocidad máxima genérica para turismos es 90 km/h, incluso para adelantar."
  },
  {
    "numero": "37",
    "pregunta": "¿Puede circular un turismo por un carril bus señalizado por línea continua?",
    "opciones": [
      "Sí.",
      "Solo si la línea del bus fuera discontinua.",
      "No."
    ],
    "correcta": 2,
    "explicacion": "Como norma general, por un carril bus (continua o discontinua) no se circula, para o estaciona. Si la línea es discontinua, se podría entrar para hacer un cambio de dirección."
  },
  {
    "numero": "38",
    "pregunta": "¿Cuál es la velocidad máxima permitida en un carril abierto para circular en sentido contrario al habitual?",
    "opciones": [
      "100 km/h.",
      "80 km/h.",
      "90 km/h."
    ],
    "correcta": 1,
    "explicacion": "En carriles de sentido contrario a lo habitual, la velocidad máxima es 80 km/h y la mínima es 60 km/h."
  },
  {
    "numero": "39",
    "pregunta": "¿Qué líquido debe utilizar para rellenar los vasos o celdas de una batería?",
    "opciones": [
      "Agua y anticongelante.",
      "Agua y aceite.",
      "Agua destilada."
    ],
    "correcta": 2,
    "explicacion": "A las baterías con mantenimiento se les echa agua destilada."
  },
  {
    "numero": "40",
    "pregunta": "¿Están obligados los turismos a llevar espejo retrovisor izquierdo?",
    "opciones": [
      "Solo si el retrovisor izquierdo no permite una visión completa de la vía.",
      "No, es opcional.",
      "Sí, es obligatorio."
    ],
    "correcta": 2,
    "explicacion": "El espejo izquierdo y el central son obligatorios a priori en un turismo."
  },
  {
    "numero": "41",
    "pregunta": "¿Está permitido circular marcha atrás como maniobra complementaria de otras maniobras?",
    "opciones": [
      "Sí, como maniobra complementaria de parar, estacionar o incorporarte a la circulación.",
      "Sí, pero solo para estacionar.",
      "No, está prohibida en todas las vías."
    ],
    "correcta": 0,
    "explicacion": "La marcha atrás se permite como complemento de estas tres maniobras, siempre que no se excedan 15 m ni se invada un cruce de vías."
  },
  {
    "numero": "42",
    "pregunta": "En una zona de calzada helada, ¿qué se puede utilizar para mejorar la adherencia?",
    "opciones": [
      "Se puede mejorar la adherencia con cadenas o neumáticos con clavos.",
      "No se puede circular.",
      "Solo neumáticos con clavos."
    ],
    "correcta": 0,
    "explicacion": "Se puede mejorar la adherencia en calzada helada con cadenas o neumáticos con clavos."
  },
  {
    "numero": "43",
    "pregunta": "¿Cuál es la velocidad máxima a la que puede circular un turismo en una autovía (por ejemplo, para adelantar)?",
    "opciones": [
      "120 + 20 km/h.",
      "100 km/h.",
      "120 km/h."
    ],
    "correcta": 2,
    "explicacion": "Ningún vehículo puede superar la velocidad máxima establecida (120 km/h para turismos en autovía) por ningún motivo."
  },
  {
    "numero": "44",
    "pregunta": "¿Qué vehículos deben tener el seguro obligatorio?",
    "opciones": [
      "Todos los vehículos a motores, excepto ciclomotores.",
      "Todos los vehículos que circulen por vías públicas.",
      "Vehículos a motor y ciclomotores."
    ],
    "correcta": 2,
    "explicacion": "Los ciclomotores deben llevar seguro. Las bicicletas no están obligadas."
  },
  {
    "numero": "45",
    "pregunta": "Si el conductor siente fatiga, ¿cuál es la mejor opción para recuperarse?",
    "opciones": [
      "Parar por un corto plazo.",
      "Descansar.",
      "Tomar una bebida energética."
    ],
    "correcta": 1,
    "explicacion": "La mejor opción siempre es descansar para eliminar la fatiga."
  },
  {
    "numero": "46",
    "pregunta": "¿Por cuánto tiempo debe tener el permiso B un titular para conducir una motocicleta de hasta 125 cm³ en territorio nacional?",
    "opciones": [
      "1 año.",
      "2 años.",
      "3 años."
    ],
    "correcta": 2,
    "explicacion": "El permiso B debe tener una antigüedad superior a 3 años para conducir motocicletas de hasta 125 cm³ solo dentro del territorio nacional."
  },
  {
    "numero": "47",
    "pregunta": "¿En qué caso se permite que un menor de edad con una estatura inferior a 1,35 m viaje excepcionalmente en el asiento delantero de un turismo?",
    "opciones": [
      "Cuando no sea posible instalar en los asientos traseros todos los sistemas de retención infantil.",
      "Cuando todos los asientos traseros están ocupados por menores o por adultos.",
      "Cuando el menor utilice cinturón de seguridad."
    ],
    "correcta": 0,
    "explicacion": "Los menores de 1,35 m deben usar sistema de retención infantil (silleta). La excepción se aplica si no es posible instalarlos atrás."
  },
  {
    "numero": "48",
    "pregunta": "¿A qué usuarios están dirigidas las indicaciones de un semáforo de peatones?",
    "opciones": [
      "Peatones y ciclistas.",
      "Todos los usuarios de la vía.",
      "Peatones exclusivamente."
    ],
    "correcta": 2,
    "explicacion": "El semáforo de peatones está dirigido solo a ellos."
  },
  {
    "numero": "49",
    "pregunta": "Se observa que un vehículo quiere incorporarse a la circulación por el carril de aceleración. ¿Qué debería hacer el conductor que ya circula por la vía principal?",
    "opciones": [
      "Nada porque tengo preferencia.",
      "Facilitar la incorporación en la medida de lo posible.",
      "Cederle paso."
    ],
    "correcta": 1,
    "explicacion": "El que se incorpora cede el paso, pero el conductor en la vía debe facilitar la maniobra sin poner en peligro a otros."
  },
  {
    "numero": "50",
    "pregunta": "Envejecer puede afectar a las capacidades necesarias para conducir con seguridad.",
    "opciones": [
      "Sí, de forma positiva, ya que mejora las capacidades.",
      "No, el envejecimiento no altera.",
      "Sí, debido al deterioro físico y mental que produce el paso del tiempo."
    ],
    "correcta": 2,
    "explicacion": "Con el envejecimiento se pierden capacidades psicomotoras, aunque se gane experiencia."
  },
  {
    "numero": "51",
    "pregunta": "A un peatón de edad avanzada, ¿le puede afectar el exceso de ruido en el ambiente?",
    "opciones": [
      "Solo si camina sin prestar la menor atención al entorno y al tráfico.",
      "Sí, lo que puede impedirle captar y oír si se acerca un vehículo.",
      "No."
    ],
    "correcta": 1,
    "explicacion": "El exceso de ruido puede impedirles oír un vehículo que se aproxima."
  },
  {
    "numero": "52",
    "pregunta": "¿Dónde debe situarse la cinta abdominal del cinturón para evitar posibles lesiones?",
    "opciones": [
      "En el abdomen.",
      "Por encima del abdomen.",
      "Por debajo del abdomen, entre los huesos de la cadera."
    ],
    "correcta": 2,
    "explicacion": "La cinta abdominal debe situarse por debajo del abdomen, coincidiendo con los huesos de la cadera."
  },
  {
    "numero": "53",
    "pregunta": "¿Cuándo es obligatorio utilizar las luces de emergencia?",
    "opciones": [
      "Cuando inmovilices por emergencia.",
      "Cuando se reduzca la velocidad en carretera solo por frenar un poquito.",
      "Cuando estacionas en doble fila."
    ],
    "correcta": 0,
    "explicacion": "Las luces de emergencia se usan al inmovilizar el vehículo por una emergencia."
  },
  {
    "numero": "54",
    "pregunta": "Si comienza a haber niebla pero esta no es muy densa, ¿debe encender algún alumbrado? ",
    "opciones": [
      "No, porque todavía no es densa",
      "Sí, el antiniebla delantero y trasero obligatoriamente",
      "Sí, el de posición y cruce y, si dispone de él, el antiniebla delantero"
    ],
    "correcta": 2,
    "explicacion": ""
  },
  {
    "numero": "55",
    "pregunta": "Cuando la luz de marcha atrás esté averiada, ¿cómo debe indicar que va a realizar la maniobra?",
    "opciones": [
      "Moviendo el brazo de arriba abajo",
      "Advirtiéndolo con el claxon",
      "Con el brazo extendido y la palma de la mano hacia atrás"
    ],
    "correcta": 2,
    "explicacion": ""
  },
  {
    "numero": "56",
    "pregunta": "En una vía de doble sentido y tres carriles, ¿para qué se utiliza el carril central?",
    "opciones": [
      "Para circulación en sentido contrario.",
      "Para circular habitualmente si el de la derecha está ocupado.",
      "Para hacer adelantamientos y giros a la izquierda."
    ],
    "correcta": 2,
    "explicacion": "Circulas por la derecha. Los giros a la izquierda y los adelantamientos se hacen por el carril central."
  },
  {
    "numero": "57",
    "pregunta": "En camiones de menos de 3,500 kg, ¿qué ocupantes están obligados a ponerse el cinturón?",
    "opciones": [
      "El conductor y los pasajeros de los asientos delanteros.",
      "Ninguno.",
      "El conductor solamente."
    ],
    "correcta": 0,
    "explicacion": "Si tienen instalados cinturones, el conductor y los pasajeros delanteros están obligados a usarlos."
  },
  {
    "numero": "58",
    "pregunta": "Si circula con su motocicleta sobre calzada mojada, en caso de frenada, ¿qué provocará esta situación?",
    "opciones": [
      "Disminución de la distancia de reacción.",
      "Un aumento de la distancia de frenado.",
      "Que no aumente la distancia de detención."
    ],
    "correcta": 1,
    "explicacion": "La calzada mojada o helada hace que la distancia de frenado aumente peligrosamente."
  },
  {
    "numero": "59",
    "pregunta": "Si un vehículo queda inmovilizado en la autovía por emergencia y necesita ayuda, ¿podrán transitar por la calzada los ocupantes?",
    "opciones": [
      "Podrán transitar por la calzada.",
      "Deberán permanecer en todo momento en el interior del vehículo.",
      "No podrán transitar por la calzada."
    ],
    "correcta": 2,
    "explicacion": "No se puede transitar por la calzada (donde los vehículos circulan rápido). Se debe salir del vehículo y estar en el arcén."
  },
  {
    "numero": "60",
    "pregunta": "¿Cuándo está prohibido adelantar en los túneles?",
    "opciones": [
      "Cuando solo hay un carril por cada sentido.",
      "Cuando el túnel no está iluminado.",
      "Cuando existe más de un carril para el mismo sentido."
    ],
    "correcta": 0,
    "explicacion": "El adelantamiento está permitido en túneles si hay más de un carril para el mismo sentido."
  }
]

// Aquí deberías pegar el resto de las 60 preguntas que me pasaste en el array 'preguntas'

/* --------------------------------
    SKELETON COMPONENT (Compatible)
---------------------------------*/
function SkeletonQuiz() {
  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 p-6 animate-pulse space-y-6">
        <div className="h-2 w-full bg-zinc-800 rounded-full" />
        <div className="h-6 w-3/4 mx-auto bg-zinc-800 rounded-lg" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 w-full bg-zinc-900 border border-zinc-800 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const supabase = createClient()
  const { playCorrect, playWrong } = useQuizSounds();

  // Estados
  const [isMounted, setIsMounted] = useState(false);
  const [num, setNum] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [correcto, setCorrecto] = useState<boolean | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [cargando, setCargando] = useState(true);

  // 1. Hidratación segura para Safari
  useEffect(() => {
    setIsMounted(true);
    cargarProgreso();
  }, []);

  // 2. Carga de progreso
  const cargarProgreso = async () => {
    try {
      // 1. Obtener la sesión activa del cliente
    // (Ejemplo con Supabase, pero aplica a cualquier Auth)
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      setNum(0);
      return;
    }

    // 2. Enviar el token explícitamente en el Header
    const res = await fetch("/api/tests", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // <--- La clave para Safari
      },
    });

    const json = await res.json();
      
      if (json.data && json.data.length > 0) {
        const pActual = json.data[0].preguntaActual;
        // Validar que el índice no supere el total de preguntas nuevas
        setNum(pActual < preguntas.length ? pActual : 0);
        setPuntos(json.data[0].puntos || 0);
        setRacha(json.data[0].racha || 0);
      } else {
        setNum(0);
      }
    } catch (error) {
      setNum(0);
    } finally {
      setCargando(false);
    }
  };

  // 3. Guardar progreso (Optimizado)
  async function guardarProgreso(nextNum: number, nextPuntos: number, nextRacha: number) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    await fetch("/api/tests", {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        pregunta_actual: nextNum,
        puntos: nextPuntos,
        racha: nextRacha,
      }),
    });
  } catch (error) {
    console.error("Error guardando", error);
  }
}
  

  // 4. Evaluar respuesta (Safari Friendly)
  const evaluarRespuesta = (index: number) => {
    if (respondido || num === null) return;

    const esCorrecta = index === preguntas[num].correcta;
    setRespondido(true);
    setCorrecto(esCorrecta);

    if (esCorrecta) {
      const nPuntos = puntos + 10;
      const nRacha = racha + 1;
      setPuntos(nPuntos);
      setRacha(nRacha);
      
      // Sonido inmediato (Safari bloquea audios con delay)
      playCorrect();
      toast.success("¡Correcto! +10 puntos 🔥");
      guardarProgreso(num, nPuntos, nRacha);
    } else {
      setRacha(0);
      playWrong();
      toast.error("Respuesta incorrecta 😕");
      guardarProgreso(num, puntos, 0);
    }
  };

  const siguientePregunta = () => {
    if (num === null) return;
    const next = num + 1;

    if (next >= preguntas.length) {
      toast.success("🎉 ¡Test completado!");
      return;
    }

    setRespondido(false);
    setCorrecto(null);
    setNum(next);
    guardarProgreso(next, puntos, racha);
    
    // Scroll arriba suave (útil en móviles al cambiar pregunta)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render condicional de seguridad
  if (!isMounted || cargando || num === null || !preguntas[num]) {
    return <SkeletonQuiz />;
  }

  const preguntaActual = preguntas[num];
  const progreso = Math.round(((num + 1) / preguntas.length) * 100);

  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center px-4 py-8">
      <Toaster position="top-center" />
      
      <Card className="w-full max-w-2xl rounded-3xl bg-zinc-950 border border-lima/30  overflow-hidden">
        <CardHeader className="space-y-6 pb-2">
          {/* Header con Progreso */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-lima">Progreso del Test</span>
              <span className="text-xs font-medium text-zinc-500">{num + 1} de {preguntas.length}</span>
            </div>
            <Progress value={progreso} className="h-1.5 bg-zinc-800" />
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-lima/10 rounded-lg">
                <Star className="h-4 w-4 text-lima" />
              </div>
              <span className="font-bold text-sm">{puntos} <span className="text-zinc-500 font-normal">pts</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-orange-400">Racha {racha}</span>
              <div className="p-1.5 bg-orange-400/10 rounded-lg">
                <Flame className="h-4 w-4 text-orange-400" />
              </div>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-center leading-tight pt-2">
            {preguntaActual.pregunta}
          </h2>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Opciones */}
          <div className="grid gap-3">
            {preguntaActual.opciones.map((op, i) => {
              const esEstaCorrecta = i === preguntaActual.correcta;
              const esLaElegidaIncorrecta = respondido && !esEstaCorrecta && correcto === false;

              return (
                <button
                  key={i}
                  disabled={respondido}
                  onClick={() => evaluarRespuesta(i)}
                  className={`
                    w-full px-5 py-4 rounded-2xl border text-left transition-all duration-200
                    active:scale-[0.98] appearance-none
                    ${!respondido 
                      ? "border-zinc-800 hover:border-lima/50 hover:bg-lima/5" 
                      : esEstaCorrecta 
                        ? "border-lima bg-lima/10 text-lima " 
                        : "border-zinc-900 text-zinc-600 opacity-60"
                    }
                  `}
                >
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm md:text-base font-medium">{op}</span>
                    {respondido && esEstaCorrecta && <CheckCircle className="h-5 w-5 shrink-0" />}
                    {respondido && i !== preguntaActual.correcta && !correcto && (
                      <XCircle className="h-5 w-5 shrink-0 text-red-500/50" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explicación y Continuar */}
          {respondido && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-4 rounded-2xl border ${correcto ? "bg-lima/5 border-lima/20" : "bg-red-500/5 border-red-500/20"}`}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">
                  {correcto ? "✅ ¡Muy bien!" : "❌ Explicación"}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {preguntaActual.explicacion}
                </p>
              </div>

              <button
                onClick={siguientePregunta}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-lima text-black py-4 font-black hover:bg-lima/90 transition-all active:scale-[0.97] appearance-none"
              >
                CONTINUAR
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}