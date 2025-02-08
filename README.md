# date-format-wareki

和暦<=>西暦変換

全元号対応：西暦 645 年（大化元年）以降

南北朝時代：`{ nanboku: "south" | "north" }`

# インストール

```sh
npm install date-format-wareki
```

# 使い方

```ts
import { toWareki, toDate } from "date-format-wareki";

const date = new Date(1996, 10, 27);
toWareki(date); // => "平成8/11/27"
toWareki(date, { era: "narrow" }); // => "H8/11/27"

const date = new Date(1338, 10, 27);
toWareki(date, { nanboku: "south" }); // => "延元3/11/27"
toWareki(date, { nanboku: "north" }); // => "暦応1/11/27"

toDate("平成8/11/27"); // => new Date(1996, 10, 27)
toDate("延元3/11/27", { namboku: "south" }); // => new Date(1338, 10, 27)
```
