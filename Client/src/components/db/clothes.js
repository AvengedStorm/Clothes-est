const clothes = [
    {
        id: "1",
        type: "shirt",
        size: "XXL",
        style: "Elegant",
        isWashed: true,
        img: "https://www.garphyttan.co.uk/8611-medium_default/garphyttan-fixar-carpenter-shirt-red.jpg",
    },
    {
        id: "2",
        type: "shirt",
        size: "XXL",
        style: "Sport",
        isWashed: false,
        img: "https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/91F89859AE004153A24E7852F8666F0F/10093625_r.jpg?fit=inside|540:540",
    },
    {
        id: "3",
        type: "shirt",
        size: "XL",
        style: "Elegant",
        isWashed: true,
        img: "https://www.all4o.com/image/cache/data/brand/TrueStory/TRUE-STORY-Elite-orienteering-shirt-Men-Deep-BLUE-800x800.jpg",
    },
    {
        id: "4",
        type: "jeans",
        size: "44",
        style: "elegant",
        isWashed: true,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fkx5d6KtxrOmWqW54Kz1WVOxYdCbvpPKFeNlPMIo4D0I70BUNFs3hH5E9lau6bd6JsI&usqp=CAU"
    },
    {
        id: "5",
        type: "shorts",
        size: "48",
        style: "elegant",
        isWashed: true,
        img: "https://media.paulsmith.com/dam/products/w_auto,c_scale/q_81/STILL/M2R/M2R-035R-G20012-43A/M2R-035R-G20012-43A_10.jpg"
    },
    {
        id: "6",
        type: "shirt",
        size: "XXL",
        style: "Elegant",
        isWashed: true,
        img: "https://m.media-amazon.com/images/I/618Q5m1RM+L._AC_UX342_.jpg",
    },
    {
        id: "7",
        type: "shirt",
        size: "XXL",
        style: "Sport",
        isWashed: false,
        img: "https://i.pinimg.com/originals/76/f1/6e/76f16ef94830f1359f6d6a47c4ec6747.jpg",
    },
    {
        id: "8",
        type: "shirt",
        size: "XL",
        style: "Elegant",
        isWashed: true,
        img: "https://dcassetcdn.com/design_img/3667819/725154/725154_21235574_3667819_cc36c391_image.png",
    },
    {
        id: "9",
        type: "shorts",
        size: "48",
        style: "elegant",
        isWashed: true,
        img: "https://contents.mediadecathlon.com/p1744581/k$943aa8fe55fcc46bc6b681c9add2fd18/men-s-swimming-short-swim-shorts-100-nbji.jpg?&f=452x452"
    },
    {
        id: "10",
        type: "jeans",
        size: "44",
        style: "elegant",
        isWashed: true,
        img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1627917737-best-jeans-2021-todds-1627912732.jpg"
    },
    {
        id: "11",
        type: "jeans",
        size: "48",
        style: "elegant",
        isWashed: true,
        img: "https://ae01.alicdn.com/kf/H2ae2545067f24f948b17bcd86487fba3o/Italian-Style-Fashion-Men-Jeans-Slim-Fit-Spliced-Designer-Ripped-Jeans-Men-Punk-Pants-High-Quality.jpg_Q90.jpg_.webp"
    },
    {
        id: "12",
        type: "jeans",
        size: "46",
        style: "elegant",
        isWashed: true,
        img: "https://ak1.ostkcdn.com/images/products/is/images/direct/99ccd665a2d810151edb0a94f76e1ef16d308875/Men-Jeans-Ripped-Slim-Straight-Fit-Biker-Jeans-With-Zipper-Deco.jpg?impolicy=medium"
    },
    {
        id: "13",
        type: "jeans",
        size: "48",
        style: "elegant",
        isWashed: true,
        img: "https://i.pinimg.com/474x/5c/96/ae/5c96ae9fba62b359fc46c943b2d55166.jpg"
    },
    {
        id: "14",
        type: "shorts",
        size: "48",
        style: "elegant",
        isWashed: true,
        img: "data:image/jpeg;base64,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"
    },
    {
        id: "15",
        type: "shorts",
        size: "48",
        style: "elegant",
        isWashed: true,
        img: "https://images-na.ssl-images-amazon.com/images/I/61ycn02yoRL._AC_UL1200_.jpg"
    },
    {
        id: "16",
        type: "shoes",
        size: "45",
        style: "elegant",
        isWashed: true,
        img: "https://target.scene7.com/is/image/Target/GUEST_0ac90038-f023-44e8-a2f3-7cacdc8a782c"
    },
    {
        id: "17",
        type: "jackets",
        size: "XXL",
        style: "elegant",
        isWashed: true,
        img: "https://3.imimg.com/data3/SH/XG/MY-11757003/men-jackets-250x250.jpg"
    },
    {
        id: "18",
        type: "shoes",
        size: "44",
        style: "elegant",
        isWashed: true,
        img: "https://img.guess.com/image/upload/f_auto,q_auto,fl_strip_profile,w_392,c_scale/v1/NA/Style/ECOMM/GMMOZER-WHMLL"
    },
    {
        id: "19",
        type: "jackets",
        size: "XXL",
        style: "elegant",
        isWashed: true,
        img: "https://images-na.ssl-images-amazon.com/images/I/41yHBLFnBVL.jpg"
    },
];

export default clothes;

// shirts, jeans, shorts, shoes, jackets