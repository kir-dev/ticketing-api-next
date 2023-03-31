# Ticketing REST API next

The new edition of the Ticketing API created for the spring 2023 NodeJS course, made with Typescript, NestJS and Prisma.

## Telepítés

```bash
# Dependenciák telepítése
npm install
# Adatbázis migrációk futtatása
npx prisma migrate dev
```

A `.env.example` fájl tartalmát másold át egy `.env` nevű fájlba, ha szükséges változtasd meg az értékeket.

## Futtatás

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Tanfolyam anyagok

A tanfolyam felvételei, diái és az első előadás példakódjai megtalálhatóak [itt](https://github.com/kir-dev/tanfolyam/tree/master/2023-tavasz/node-tanfolyam).

A második előadás végén (első live coding session) [idáig](https://github.com/kir-dev/ticketing-api-next/tree/1.0.0), míg a harmadik végén [idáig](https://github.com/kir-dev/ticketing-api-next/tree/2.0.0) jutottunk. Ezután még javítottam a validáción és a hibakezelésen, így a masteren található verzió akár production-ben is használható.

## Extrák

Egy kicsit bővebben arról, hogy mi is történt a repóban a tanfolyam után.

### Validáció

A harmadik alkalom végén láttuk a `ParseIntPipe`-ot, amivel könnyedén validálhattuk, hogy a HTTP paraméterek tényleg számok legyenek. Ez egy nagyon jó kezdés, de minden bejövő adatot hasonlóan validálni kéne, hogy biztosak lehessünk benne, az alkalmazásunk nem fog eltörni.

Ehhez a [class-validator](https://github.com/typestack/class-validator) nevű könyvtárat használtam. Ezzel osztályok property-jeire rakott dekorátorokkal lehet a validációs szabályokat definiálni. Azonban mi a Prisma típusait használtuk a bejövő adatokra, ezek pedig előre generált típusok, nem tudjuk szerkeszteni őket. Ezért sajnos ezeket el kellett hagyni, és saját DTO (Data Transfer Object) osztályokat hoztam létre. Ezek a típusok megszabják, hogy milyen formátumban fog utazni az adat a backend és a frontend között. Valamint az egyes property-kre rárakhatom a class-validator dekorátorait, ezzel például validálva hogy egy szám tényleg szám lesz, vagy egy enum csak a megadott értékeket veszi-e fel. Ha egy bejövő adat a validáció szerint érvénytelen, a Nest szép hibát fog dobni a felhasználónak, még mielőtt a kontroller vagy service metódusokat elkezdené futtatni.

Ha megvannak a DTO-ink, érdemes minden service és controller metódus visszatérési értékét explicit megadni, így a TypeScript már kódolás közben szólni fog, ha valamelyik végpontunk nem azt adná vissza, amit mi terveztünk.

A class-validator felkonfigurálása a `main.ts`-ben történik, a `useGlobalPipes` hívással. Nest + class-validator validációról bővebben [itt](https://docs.nestjs.com/techniques/validation) tudsz olvasni.

### SwaggerUI/OpenAPI

A REST API fejlesztés lényege, hogy egy könnyen használható interfészt késztsünk, amit a frontend fejlesztők használnak a felhasználói felület készítése közben. Nagyban megkönnyítjük a munkájukat, ha ezt az interfészt grafikus formában is láthatják. Erre az iparban leggyakrabban az [OpenAPI](https://swagger.io/specification/)-t (korábbi nevén SwaggerUI) használják. Nest-ben ezt nagyon egyszerű használni, hiszen a controller fájlainkat elemzve automatikusan generálja a felületet. A konfigurációja szintén a `main.ts` fájlban történik. Ha elindítod a szervert `http://localhost:3300/api` címen érheted el ezt a felületet. Felsorolja a végpontokat, az azokon elvárt paraméterekt, a visszatérési értékeket, sőt tesztelni is lehet a végpontokat.

Nest + OpenAPI-ról bővebben [itt](https://docs.nestjs.com/openapi/introduction) tudsz olvasni.

### Hibakezelés

A harmadik alkalom végén bemutatott hibakezelést alkalmazt azokra az adatbázis műveletekre, ahol elképzelhető valamilyen hiba.

### Környezeti változók

Bizonyos konstansok nem annyira konstansok az alkalmazásunk, mind gondoljuk. Ilyen például a port száma, a frontend URL-je vagy az adatbázis címe. Habár fejlesztés közben ezek nem fognak változni, production-ben lehet hogy teljesen más értékeket vesznek fel. Ezért az ilyen értékeket környezeti változókban szoktuk tárolni. Ezeket egy `.env` nevű fájlban kell definiálni, az értékei NodeJs alkalmazásokban `process.env.<kulcs>` formában érhetőek el. Itt tárolunk olyan értékeket is, amiket nem szeretnénk publikálni, például adatbázis jelszavakat, API kulcsokat, ezért ezt a fájlt soha nem töltjük fel Git-re. Viszont van egy `.env.example` fájl a gyökérmappában, ennek a tartalma ez ilyen egyszerű alkalmazás esetében egy az egyben használható `.env`-ként. Az alkalmazás futtatásához hozd létre a `.env` fájlt és másold bele a `.env.example` tartalmát.
