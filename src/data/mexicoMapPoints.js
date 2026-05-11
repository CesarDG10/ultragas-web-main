// Punto principal
export const CDMX = {
  id: 'cdmx', name: 'CDMX – Hub Central',
  lng: -99.1332, lat: 19.4326,
  size: 'w-4 h-4', color: 'bg-brand-blue', delay: '0s',
}

// Ciudades destacadas (marcadores medianos con pulso)
export const highlightedCities = [
  { id: 'monterrey',   lng: -100.3181, lat: 25.6866, size: 'w-3 h-3', color: 'bg-brand-purple', delay: '0.5s' },
  { id: 'guadalajara', lng: -103.3496, lat: 20.6597, size: 'w-3 h-3', color: 'bg-brand-blue',   delay: '1.2s' },
  { id: 'tijuana',     lng: -117.0382, lat: 32.5149, size: 'w-3 h-3', color: 'bg-brand-purple', delay: '1.8s' },
  { id: 'cancun',      lng:  -86.8515, lat: 21.1619, size: 'w-3 h-3', color: 'bg-brand-blue',   delay: '0.8s' },
  { id: 'puebla',      lng:  -98.2035, lat: 19.0414, size: 'w-2 h-2', color: 'bg-slate-400',    delay: '2.1s' },
  { id: 'leon',        lng: -101.6820, lat: 21.1234, size: 'w-2 h-2', color: 'bg-slate-400',    delay: '2.8s' },
  { id: 'queretaro',   lng: -100.3899, lat: 20.5888, size: 'w-2 h-2', color: 'bg-slate-400',    delay: '1.5s' },
  { id: 'merida',      lng:  -89.6169, lat: 20.9674, size: 'w-2 h-2', color: 'bg-slate-400',    delay: '1.9s' },
  { id: 'chihuahua',   lng: -106.0715, lat: 28.6353, size: 'w-2 h-2', color: 'bg-slate-400',    delay: '3.5s' },
]

const colors  = ['bg-brand-blue', 'bg-brand-purple', 'bg-slate-400']
const sizes   = ['w-2 h-2', 'w-2 h-2', 'w-3 h-3']
const delays  = ['0s', '0.3s', '0.5s', '0.8s', '1s', '1.2s', '1.5s', '1.8s', '2.1s', '2.5s']

/**
 * Puntos ambientales: coordenadas reales de ciudades mexicanas distribuidas en
 * los 32 estados, garantizando que todos los puntos estén en territorio terrestre.
 */
const cityCoords = [
  // ── Noroeste ────────────────────────────────────────────────────────────────
  [-115.4521, 32.6245], // Mexicali, B.C.
  [-116.6006, 31.8667], // Ensenada, B.C.
  [-110.9559, 29.0729], // Hermosillo, Son.
  [-109.9309, 27.4826], // Ciudad Obregón, Son.
  [-109.4417, 27.0755], // Navojoa, Son.
  [-110.8876, 27.9225], // Guaymas, Son.
  [-110.3119, 24.1426], // La Paz, B.C.S.
  [-109.7089, 23.0597], // San José del Cabo, B.C.S.
  [-108.9857, 25.7925], // Los Mochis, Sin.
  [-108.4636, 25.5683], // Guasave, Sin.
  [-107.3942, 24.8091], // Culiacán, Sin.
  [-106.4111, 23.2494], // Mazatlán, Sin.
  [-105.6661, 26.9285], // Hidalgo del Parral, Chih.
  [-105.4710, 28.1921], // Delicias, Chih.
  [-106.8675, 26.1944], // Guachochi, Chih.

  // ── Noreste ─────────────────────────────────────────────────────────────────
  [-103.4068, 25.5438], // Torreón, Coah.
  [-101.4216, 26.9114], // Monclova, Coah.
  [-100.5233, 28.7000], // Piedras Negras, Coah.
  [-100.9737, 25.4232], // Saltillo, Coah.
  [ -98.2934, 26.0921], // Reynosa, Tamps.
  [ -97.5028, 25.8698], // Matamoros, Tamps.
  [ -99.5178, 27.4769], // Nuevo Laredo, Tamps.
  [ -99.1426, 23.7369], // Ciudad Victoria, Tamps.
  [ -97.8486, 22.2475], // Tampico, Tamps.
  [ -98.9746, 22.7421], // Ciudad Mante, Tamps.
  [ -99.5628, 24.8601], // Linares, N.L.

  // ── Centro-Norte ────────────────────────────────────────────────────────────
  [-104.6732, 24.0232], // Durango, Dgo.
  [-102.5532, 22.7709], // Zacatecas, Zac.
  [-102.8724, 23.1793], // Fresnillo, Zac.
  [-100.9855, 22.1565], // San Luis Potosí, S.L.P.
  [-100.6454, 23.6518], // Matehuala, S.L.P.
  [ -99.0126, 21.9962], // Ciudad Valles, S.L.P.
  [ -99.9955, 21.9318], // Rioverde, S.L.P.
  [-102.2916, 21.8853], // Aguascalientes, Ags.
  [-102.3003, 20.4063], // La Barca, Jal.
  [-103.8619, 20.3153], // Autlán de Navarro, Jal.
  [-104.8954, 21.5038], // Tepic, Nay.
  [-105.2253, 20.6534], // Puerto Vallarta, Jal.

  // ── Bajío ───────────────────────────────────────────────────────────────────
  [-101.2574, 21.0190], // Guanajuato, Gto.
  [-101.3538, 20.6742], // Irapuato, Gto.
  [-100.8166, 20.5236], // Celaya, Gto.
  [-101.1931, 20.5709], // Salamanca, Gto.
  [-101.1950, 19.7059], // Morelia, Mich.
  [-102.0622, 19.9853], // Zamora, Mich.
  [-102.2073, 20.1226], // La Piedad, Mich.
  [-103.1952, 19.3640], // Ciudad Guzmán, Jal.

  // ── Centro ──────────────────────────────────────────────────────────────────
  [ -99.6557, 19.2826], // Toluca, Méx.
  [ -98.7310, 20.1011], // Pachuca, Hgo.
  [ -98.9428, 20.2696], // Actopan, Hgo.
  [ -98.3601, 20.0839], // Tulancingo, Hgo.
  [ -99.3402, 20.0521], // Tula, Hgo.
  [ -98.2370, 19.3139], // Tlaxcala, Tlax.
  [ -98.4369, 19.5509], // Apizaco, Tlax.
  [ -97.3943, 18.4613], // Tehuacán, Pue.
  [ -99.2309, 18.9242], // Cuernavaca, Mor.
  [ -99.1618, 18.8871], // Jiutepec, Mor.
  [ -99.4958, 18.6842], // Cuautla, Mor.

  // ── Occidente ───────────────────────────────────────────────────────────────
  [-103.7248, 19.2452], // Colima, Col.
  [-104.3344, 19.0514], // Manzanillo, Col.
  [-103.0000, 19.6500], // Apatzingán, Mich.
  [-101.9490, 19.4235], // Pátzcuaro, Mich.

  // ── Sur ─────────────────────────────────────────────────────────────────────
  [ -99.8237, 16.8531], // Acapulco, Gro.
  [ -99.5004, 17.5506], // Chilpancingo, Gro.
  [ -98.0418, 17.5490], // Tlapa de Comonfort, Gro.
  [ -96.7266, 17.0732], // Oaxaca, Oax.
  [ -95.2414, 16.3270], // Tehuantepec, Oax.
  [ -96.7157, 16.8625], // Tlacolula, Oax.

  // ── Sureste ─────────────────────────────────────────────────────────────────
  [ -93.1132, 16.7526], // Tuxtla Gutiérrez, Chis.
  [ -92.6376, 16.7372], // San Cristóbal de las Casas, Chis.
  [ -92.1353, 16.2534], // Comitán, Chis.
  [ -92.2622, 14.9000], // Tapachula, Chis.
  [ -93.7250, 16.6940], // Cintalapa, Chis.
  [ -92.9199, 17.9897], // Villahermosa, Tab.
  [ -94.5529, 17.9929], // Minatitlán, Ver.
  [ -94.4418, 18.1500], // Coatzacoalcos, Ver.
  [ -96.9270, 19.5438], // Xalapa, Ver.
  [ -96.1342, 19.1738], // Veracruz, Ver.
  [ -97.4502, 20.5353], // Poza Rica, Ver.
  [ -97.1043, 18.8487], // Orizaba, Ver.
  [ -96.9255, 18.8854], // Córdoba, Ver.

  // ── Península de Yucatán ────────────────────────────────────────────────────
  [ -90.5349, 19.8301], // Campeche, Camp.
  [ -91.8071, 18.6500], // Ciudad del Carmen, Camp.
  [ -88.3015, 18.5001], // Chetumal, Q.Roo
  [ -87.0739, 20.6296], // Playa del Carmen, Q.Roo
  [ -88.2015, 20.6897], // Valladolid, Yuc.
  [ -88.1625, 21.1427], // Tizimín, Yuc.
  [ -89.0136, 20.5265], // Motul, Yuc.
  [ -90.3758, 19.6565], // Hecelchakán, Camp.
]

export const ambientPointsCoords = cityCoords.map(([lng, lat], i) => ({
  id: `city-${i}`,
  lng,
  lat,
  size:  sizes[i % sizes.length],
  color: colors[i % colors.length],
  delay: delays[i % delays.length],
}))
