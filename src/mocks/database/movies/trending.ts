export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type PayloadMovie = {
    movies: Movie[];
    success: boolean;
};

export const Trending: PayloadMovie = {
    movies: [
        {
            adult: false,
            backdrop_path: '/qK7Ssnrfvrt65F66A1thvehfQg2.jpg',
            genre_ids: [16, 10751, 35, 12, 9648],
            id: 420821,
            original_language: 'en',
            original_title: "Chip 'n Dale: Rescue Rangers",
            overview:
                'Decades since their successful television series was canceled, Chip has succumbed to a life of suburban domesticity as an insurance salesman. Dale, meanwhile, has had CGI surgery and works the nostalgia convention circuit, desperate to relive his glory days. When a former cast mate mysteriously disappears, Chip and Dale must repair their broken friendship and take on their Rescue Rangers detective personas once again to save their friend’s life.',
            popularity: 123.033,
            poster_path: '/7UGmn8TyWPPzkjhLUW58cOUHjPS.jpg',
            release_date: '2022-05-20',
            title: "Chip 'n Dale: Rescue Rangers",
            video: false,
            vote_average: 7.3,
            vote_count: 86
        },
        {
            adult: false,
            backdrop_path: '/rl49Qr4KbfTSYjXYAN8fMDIt2xS.jpg',
            genre_ids: [28, 878, 14],
            id: 526896,
            original_language: 'en',
            original_title: 'Morbius',
            overview:
                'Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.',
            popularity: 8853.551,
            poster_path: '/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
            release_date: '2022-03-30',
            title: 'Morbius',
            video: false,
            vote_average: 6.3,
            vote_count: 995
        },
        {
            adult: false,
            backdrop_path: '/kiH3KPWi7BaRMvdAigcwrUFViHl.jpg',
            genre_ids: [9648, 53, 28, 80],
            id: 818397,
            original_language: 'en',
            original_title: 'Memory',
            overview:
                "Alex, an assassin-for-hire, finds that he's become a target after he refuses to complete a job for a dangerous criminal organization. With the crime syndicate and FBI in hot pursuit, Alex has the skills to stay ahead, except for one thing: he is struggling with severe memory loss, affecting his every move. Alex must question his every action and whom he can ultimately trust.",
            popularity: 165.203,
            poster_path: '/tXpLmtnArbGcE75iPJVYibW7BBf.jpg',
            release_date: '2022-04-28',
            title: 'Memory',
            video: false,
            vote_average: 7.1,
            vote_count: 56
        },
        {
            adult: false,
            backdrop_path: '/kB1Qrsg189eDz4Ej3ABXtLudClq.jpg',
            genre_ids: [35],
            id: 810171,
            original_language: 'en',
            original_title: 'The Valet',
            overview:
                'World famous movie star Olivia faces a PR disaster when a paparazzi snaps a photo of her with her married lover, Vincent. The hard-working valet Antonio accidentally appears in the same photo and is enlisted to pose as Olivia’s new boyfriend as a cover-up. This ruse with Olivia thrusts Antonio into the spotlight and unexpected chaos.',
            popularity: 96.148,
            poster_path: '/q7FmdJHKMLIC4XgWfcFRIu2iVdL.jpg',
            release_date: '2022-05-11',
            title: 'The Valet',
            video: false,
            vote_average: 7.3,
            vote_count: 34
        },
        {
            adult: false,
            backdrop_path: '/iN3vKCuOGRdZ9Cn3yRGCyMlaiST.jpg',
            genre_ids: [28, 12, 878, 35],
            id: 545611,
            original_language: 'en',
            original_title: 'Everything Everywhere All at Once',
            overview:
                "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
            popularity: 335.704,
            poster_path: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
            release_date: '2022-03-24',
            title: 'Everything Everywhere All at Once',
            video: false,
            vote_average: 8.7,
            vote_count: 284
        },
        {
            adult: false,
            backdrop_path: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
            genre_ids: [28, 878, 35, 10751, 12],
            id: 675353,
            original_language: 'en',
            original_title: 'Sonic the Hedgehog 2',
            overview:
                'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
            popularity: 7843.215,
            poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
            release_date: '2022-03-30',
            title: 'Sonic the Hedgehog 2',
            video: false,
            vote_average: 7.8,
            vote_count: 1536
        },
        {
            adult: false,
            backdrop_path: '/xHrp2pq73oi9D64xigPjWW1wcz1.jpg',
            genre_ids: [80, 9648, 53],
            id: 414906,
            original_language: 'en',
            original_title: 'The Batman',
            overview:
                'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
            popularity: 3497.925,
            poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
            release_date: '2022-03-01',
            title: 'The Batman',
            video: false,
            vote_average: 7.8,
            vote_count: 4693
        },
        {
            adult: false,
            backdrop_path: '/A3bsT0m1um6tvcmlIGxBwx9eAxn.jpg',
            genre_ids: [28, 12, 35, 10749],
            id: 752623,
            original_language: 'en',
            original_title: 'The Lost City',
            overview:
                'A reclusive romance novelist who was sure nothing could be worse than getting stuck on a book tour with her cover model, until a kidnapping attempt sweeps them both into a cutthroat jungle adventure, proving life can be so much stranger, and more romantic, than any of her paperback fictions.',
            popularity: 10211.875,
            poster_path: '/neMZH82Stu91d3iqvLdNQfqPPyl.jpg',
            release_date: '2022-03-24',
            title: 'The Lost City',
            video: false,
            vote_average: 6.7,
            vote_count: 683
        },
        {
            adult: false,
            backdrop_path: '/BlC5QrSHnEHFAjAYrLdngUIA8r.jpg',
            genre_ids: [35, 99, 28],
            id: 828853,
            original_language: 'en',
            original_title: 'Jackass 4.5',
            overview:
                "Through outrageous, never-before-seen footage, witness the making of the Jackass crew's last go at wild stunts.",
            popularity: 148.609,
            poster_path: '/kewHZSdRyOWaLwVwhmoMhjp40Lz.jpg',
            release_date: '2022-05-20',
            title: 'Jackass 4.5',
            video: false,
            vote_average: 6.8,
            vote_count: 25
        },
        {
            adult: false,
            backdrop_path: '/awTRgcAANmco5SaSqoHPHsS5fqZ.jpg',
            genre_ids: [878, 35, 53],
            id: 698128,
            original_language: 'en',
            original_title: 'Dual',
            overview:
                'A terminally ill woman opts for a cloning procedure to ease her loss on her friends and family. When she makes a miraculous recovery, her attempts to have her clone decommissioned fail and lead to a court-mandated duel to the death.',
            popularity: 16.057,
            poster_path: '/wDEse2TQRiyfhdlusSXBdkDOQRj.jpg',
            release_date: '2022-03-18',
            title: 'Dual',
            video: false,
            vote_average: 6.8,
            vote_count: 13
        },
        {
            adult: false,
            backdrop_path: '/cqnVuxXe6vA7wfNWubak3x36DKJ.jpg',
            genre_ids: [28, 12, 14, 53],
            id: 639933,
            original_language: 'en',
            original_title: 'The Northman',
            overview:
                "Prince Amleth is on the verge of becoming a man when his father is brutally murdered by his uncle, who kidnaps the boy's mother. Two decades later, Amleth is now a Viking who's on a mission to save his mother, kill his uncle and avenge his father.",
            popularity: 6992.273,
            poster_path: '/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg',
            release_date: '2022-04-07',
            title: 'The Northman',
            video: false,
            vote_average: 7.5,
            vote_count: 1011
        },
        {
            adult: false,
            backdrop_path: '/6fRVz7ZIZIGFEOq4THY2pdBBhfS.jpg',
            genre_ids: [35, 10749],
            id: 934761,
            original_language: 'en',
            original_title: 'A Perfect Pairing',
            overview:
                'To land a major client, an LA wine exec travels to an Australian sheep station, where she signs on as a ranch hand and hits it off with a rugged local.',
            popularity: 105.546,
            poster_path: '/h65lLhYEfRGOWVZzwX9n7vYOixf.jpg',
            release_date: '2022-05-19',
            title: 'A Perfect Pairing',
            video: false,
            vote_average: 7,
            vote_count: 31
        },
        {
            adult: false,
            backdrop_path: '/nGHpOx23acHMXlkiltwFD9QhbhZ.jpg',
            genre_ids: [35, 10749],
            id: 970308,
            original_language: 'nl',
            original_title: 'F*ck De Liefde 2',
            overview:
                'In this romantic comedy, several friends, each dealing with unhappy love lives, turn to each other for help - but not always with the best results.',
            popularity: 54.674,
            poster_path: '/u71tsZpPsIK9kTXbxHtSbNr6oSd.jpg',
            release_date: '2022-05-20',
            title: 'F*ck Love Too',
            video: true,
            vote_average: 6.1,
            vote_count: 7
        },
        {
            adult: false,
            backdrop_path: '/AdyJH8kDm8xT8IKTlgpEC15ny4u.jpg',
            genre_ids: [14, 28, 12],
            id: 453395,
            original_language: 'en',
            original_title: 'Doctor Strange in the Multiverse of Madness',
            overview:
                'Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.',
            popularity: 3368.831,
            poster_path: '/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
            release_date: '2022-05-04',
            title: 'Doctor Strange in the Multiverse of Madness',
            video: false,
            vote_average: 7.4,
            vote_count: 1748
        },
        {
            adult: false,
            backdrop_path: '/fEe5fe82qHzjO4yej0o79etqsWV.jpg',
            genre_ids: [16, 35, 28, 10751, 80],
            id: 629542,
            original_language: 'en',
            original_title: 'The Bad Guys',
            overview:
                'When the infamous Bad Guys are finally caught after years of countless heists and being the world’s most-wanted villains, Mr. Wolf brokers a deal to save them all from prison.',
            popularity: 3284.364,
            poster_path: '/7qop80YfuO0BwJa1uXk1DXUUEwv.jpg',
            release_date: '2022-03-17',
            title: 'The Bad Guys',
            video: false,
            vote_average: 7.8,
            vote_count: 465
        },
        {
            adult: false,
            backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
            genre_ids: [28, 12, 878],
            id: 634649,
            original_language: 'en',
            original_title: 'Spider-Man: No Way Home',
            overview:
                'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
            popularity: 3243.224,
            poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
            release_date: '2021-12-15',
            title: 'Spider-Man: No Way Home',
            video: false,
            vote_average: 8.1,
            vote_count: 12927
        },
        {
            adult: false,
            backdrop_path: '/aEGiJJP91HsKVTEPy1HhmN0wRLm.jpg',
            genre_ids: [28, 12],
            id: 335787,
            original_language: 'en',
            original_title: 'Uncharted',
            overview:
                'A young street-smart, Nathan Drake and his wisecracking partner Victor “Sully” Sullivan embark on a dangerous pursuit of “the greatest treasure never found” while also tracking clues that may lead to Nathan’s long-lost brother.',
            popularity: 3767.836,
            poster_path: '/tlZpSxYuBRoVJBOpUrPdQe9FmFq.jpg',
            release_date: '2022-02-10',
            title: 'Uncharted',
            video: false,
            vote_average: 7.2,
            vote_count: 2047
        },
        {
            adult: false,
            backdrop_path: '/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
            genre_ids: [28, 18],
            id: 361743,
            original_language: 'en',
            original_title: 'Top Gun: Maverick',
            overview:
                "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
            popularity: 426.787,
            poster_path: '/wxP2Mzv9CdjOK6t4dNnFGqIQl0V.jpg',
            release_date: '2022-05-24',
            title: 'Top Gun: Maverick',
            video: false,
            vote_average: 8.7,
            vote_count: 17
        },
        {
            adult: false,
            backdrop_path: '/zGLHX92Gk96O1DJvLil7ObJTbaL.jpg',
            genre_ids: [28, 12, 14],
            id: 338953,
            original_language: 'en',
            original_title: 'Fantastic Beasts: The Secrets of Dumbledore',
            overview:
                "Professor Albus Dumbledore knows the powerful, dark wizard Gellert Grindelwald is moving to seize control of the wizarding world. Unable to stop him alone, he entrusts magizoologist Newt Scamander to lead an intrepid team of wizards and witches. They soon encounter an array of old and new beasts as they clash with Grindelwald's growing legion of followers.",
            popularity: 954.7,
            poster_path: '/jrgifaYeUtTnaH7NF5Drkgjg2MB.jpg',
            release_date: '2022-04-06',
            title: 'Fantastic Beasts: The Secrets of Dumbledore',
            video: false,
            vote_average: 6.7,
            vote_count: 1067
        },
        {
            adult: false,
            backdrop_path: '/1aQ3plcRUNLnJRaL7KTvZU9IqcU.jpg',
            genre_ids: [28],
            id: 923597,
            original_language: 'en',
            original_title: 'Eraser: Reborn',
            overview:
                'U.S. Marshal Mason Pollard specializes in “erasing” people – faking the deaths of high-risk witnesses. With the technological advances of the last 25 years, the game has upgraded, and it’s just another day at the office when he’s assigned to Rina Kimura, a crime boss’ wife who’s decided to turn state’s evidence. As the two flee to Cape Town, South Africa, Pollard discovers he’s been set up and will need to be at the top of his game, or he’ll be the one who’s erased.',
            popularity: 52.494,
            poster_path: '/lWE48knKsaPGqVoANXoWraiub2d.jpg',
            release_date: '2022-03-31',
            title: 'Eraser: Reborn',
            video: false,
            vote_average: 7.4,
            vote_count: 18
        }
    ],
    success: true
};
