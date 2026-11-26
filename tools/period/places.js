/* Campaign Atlas — place names for the period maps, as they were known at the time.
   Each entry: [name, latitude, longitude, rank, kind]
   rank 1 shows at every zoom, 2 from a regional view, 3 only when zoomed in.
   kind: 'city' (default), 'capital', 'region', 'nation' (Native nation), or 'water'. */
module.exports = {
  'civil-war': [
    ['Washington', 38.90, -77.04, 1, 'capital'], ['Richmond', 37.54, -77.44, 1, 'capital'],
    ['New York', 40.71, -74.01, 1], ['St. Louis', 38.63, -90.20, 1], ['Nashville', 36.16, -86.78, 1], ['Atlanta', 33.75, -84.39, 1],
    ['Charleston', 32.78, -79.93, 1], ['New Orleans', 29.95, -90.07, 1],
    ['Philadelphia', 39.95, -75.17, 2], ['Baltimore', 39.29, -76.61, 2], ['Boston', 42.36, -71.06, 2], ['Cincinnati', 39.10, -84.51, 2],
    ['Louisville', 38.25, -85.76, 2], ['Chicago', 41.88, -87.63, 2], ['Memphis', 35.15, -90.05, 2], ['Chattanooga', 35.05, -85.31, 2],
    ['Savannah', 32.08, -81.09, 2], ['Mobile', 30.69, -88.04, 2], ['Vicksburg', 32.35, -90.88, 2], ['Montgomery', 32.38, -86.31, 2],
    ['Pittsburgh', 40.44, -80.00, 3], ['Cairo', 37.01, -89.18, 3], ['Knoxville', 35.96, -83.92, 3], ['Wilmington', 34.23, -77.94, 3],
    ['Raleigh', 35.78, -78.64, 3], ['Columbia', 34.00, -81.03, 3], ['Jackson', 32.30, -90.18, 3], ['Corinth', 34.93, -88.52, 3],
    ['Petersburg', 37.23, -77.40, 3], ['Harpers Ferry', 39.32, -77.73, 3], ['Norfolk', 36.85, -76.29, 3], ['Little Rock', 34.75, -92.29, 3],
    ['Indianapolis', 39.77, -86.16, 3], ['Columbus', 39.96, -83.00, 3], ['Harrisburg', 40.26, -76.88, 3], ['Wheeling', 40.06, -80.72, 3],
    ['Springfield', 39.80, -89.65, 3],
    ['Atlantic Ocean', 33.6, -75.6, 1, 'water'], ['Gulf of Mexico', 28.6, -89.0, 1, 'water'], ['Chesapeake Bay', 37.9, -76.15, 3, 'water'],
    ['Mississippi River', 33.75, -91.15, 2, 'water'], ['Ohio River', 37.87, -87.2, 2, 'water'], ['Tennessee River', 35.6, -88.03, 3, 'water'],
    ['Shenandoah Valley', 38.75, -78.7, 3, 'region']
  ],
  'american-revolution': [
    ['Boston', 42.36, -71.06, 1], ['New York', 40.71, -74.01, 1], ['Philadelphia', 39.95, -75.17, 1, 'capital'], ['Charles Town', 32.78, -79.93, 1], ['Quebec', 46.81, -71.21, 1],
    ['Savannah', 32.08, -81.09, 2], ['Williamsburg', 37.27, -76.71, 2], ['Baltimore', 39.29, -76.61, 2], ['Newport', 41.49, -71.31, 2],
    ['Albany', 42.65, -73.75, 2], ['Montreal', 45.50, -73.57, 2], ['Halifax', 44.65, -63.57, 2], ['Fort Pitt', 40.44, -80.01, 2],
    ['St. Augustine', 29.90, -81.31, 2], ['Pensacola', 30.42, -87.22, 2], ['New Orleans', 29.95, -90.07, 2],
    ['Richmond', 37.54, -77.44, 3], ['Annapolis', 38.98, -76.49, 3], ['Fort Ticonderoga', 43.84, -73.39, 3], ['West Point', 41.39, -73.96, 3],
    ['Valley Forge', 40.10, -75.46, 3], ['Morristown', 40.80, -74.48, 3], ['Wilmington', 34.23, -77.94, 3], ['Charlotte', 35.23, -80.84, 3],
    ['Norfolk', 36.85, -76.29, 3], ['Hartford', 41.76, -72.67, 3], ['Portsmouth', 43.07, -70.76, 3], ['Falmouth', 43.66, -70.26, 3],
    ['Detroit', 42.33, -83.05, 3], ['Vincennes', 38.68, -87.53, 3], ['Kaskaskia', 37.92, -89.92, 3], ['Boonesborough', 37.90, -84.27, 3],
    ['Province of Quebec', 46.3, -75.2, 1, 'region'], ['Nova Scotia', 45.2, -63.4, 2, 'region'], ['East Florida', 29.2, -82.0, 2, 'region'],
    ['West Florida', 31.2, -88.3, 2, 'region'], ['Louisiana (Spain)', 34.2, -92.6, 2, 'region'], ['District of Maine', 45.1, -69.2, 2, 'region'],
    ['Kentucky', 37.5, -85.3, 3, 'region'],
    ['Haudenosaunee (Iroquois)', 42.9, -77.4, 2, 'nation'], ['Cherokee', 35.3, -84.3, 2, 'nation'], ['Muscogee (Creek)', 32.9, -86.1, 2, 'nation'],
    ['Shawnee', 39.9, -83.7, 2, 'nation'], ['Lenape (Delaware)', 40.4, -81.9, 3, 'nation'], ['Choctaw', 32.7, -89.3, 3, 'nation'], ['Chickasaw', 34.4, -89.0, 3, 'nation'],
    ['Atlantic Ocean', 36.5, -72.5, 1, 'water'], ['Chesapeake Bay', 37.9, -76.15, 3, 'water'], ['Lake Champlain', 44.55, -73.35, 3, 'water'],
    ['Lake Ontario', 43.65, -77.8, 2, 'water'], ['Lake Erie', 42.2, -81.2, 2, 'water'], ['Ohio River', 37.87, -87.2, 3, 'water'], ['Mississippi River', 35.6, -89.95, 3, 'water']
  ],
  'world-war-2-europe': [
    ['London', 51.51, -0.13, 1, 'capital'], ['Paris', 48.86, 2.35, 1, 'capital'], ['Berlin', 52.52, 13.40, 1, 'capital'], ['Rome', 41.90, 12.50, 1, 'capital'],
    ['Moscow', 55.75, 37.62, 1, 'capital'], ['Warsaw', 52.23, 21.01, 1, 'capital'], ['Leningrad', 59.94, 30.31, 1], ['Stalingrad', 48.71, 44.51, 1], ['Cairo', 30.04, 31.24, 1, 'capital'],
    ['Kiev', 50.45, 30.52, 2], ['Minsk', 53.90, 27.57, 2], ['Vienna', 48.21, 16.37, 2], ['Prague', 50.08, 14.44, 2, 'capital'], ['Budapest', 47.50, 19.04, 2, 'capital'],
    ['Bucharest', 44.43, 26.10, 2, 'capital'], ['Belgrade', 44.80, 20.47, 2, 'capital'], ['Athens', 37.98, 23.73, 2, 'capital'], ['Danzig (Free City)', 54.35, 18.65, 2],
    ['Königsberg', 54.71, 20.51, 2], ['Munich', 48.14, 11.58, 2], ['Hamburg', 53.55, 9.99, 2], ['Amsterdam', 52.37, 4.90, 2, 'capital'], ['Brussels', 50.85, 4.35, 2, 'capital'],
    ['Vichy', 46.13, 3.43, 2], ['Madrid', 40.42, -3.70, 2, 'capital'], ['Lisbon', 38.72, -9.14, 2, 'capital'], ['Oslo', 59.91, 10.75, 2, 'capital'],
    ['Stockholm', 59.33, 18.07, 2, 'capital'], ['Copenhagen', 55.68, 12.57, 2, 'capital'], ['Helsinki', 60.17, 24.94, 2, 'capital'], ['Istanbul', 41.01, 28.98, 2],
    ['Alexandria', 31.20, 29.92, 2], ['Tobruk', 32.08, 23.96, 2], ['Tripoli', 32.89, 13.19, 2], ['Tunis', 36.81, 10.18, 2], ['Algiers', 36.75, 3.06, 2],
    ['Casablanca', 33.57, -7.59, 2], ['Gibraltar', 36.14, -5.35, 2], ['Malta', 35.90, 14.51, 2], ['Sevastopol', 44.62, 33.53, 2], ['Kharkov', 49.99, 36.23, 2],
    ['Breslau', 51.11, 17.03, 3], ['Cologne', 50.94, 6.96, 3], ['Dresden', 51.05, 13.74, 3], ['Nuremberg', 49.45, 11.08, 3], ['Marseille', 43.30, 5.37, 3],
    ['Ankara', 39.93, 32.86, 3, 'capital'], ['Naples', 40.85, 14.27, 3], ['Odessa', 46.48, 30.73, 3], ['Smolensk', 54.78, 32.05, 3], ['Lwów', 49.84, 24.03, 3], ['Wilno', 54.69, 25.28, 3],
    ['Atlantic Ocean', 46.0, -15.0, 1, 'water'], ['North Sea', 56.2, 3.2, 1, 'water'], ['Baltic Sea', 56.6, 18.8, 2, 'water'], ['Mediterranean Sea', 34.6, 18.5, 1, 'water'],
    ['Black Sea', 43.3, 34.5, 1, 'water'], ['English Channel', 50.15, -1.6, 3, 'water']
  ]
};
