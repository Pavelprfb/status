// StatusBox status generator
// Generates 2550+ unique bilingual (EN/BN) statuses with emojis.
// Usage: node scripts/generate-statuses.mjs
// Output: data/statuses.js (do not edit by hand)

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TARGET_PER_CATEGORY = 150;
const SEED = 20260802;

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(SEED);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleEmojis(pool) {
  const n = 1 + Math.floor(rand() * 2);
  return shuffle(pool).slice(0, n).join("");
}

const T = {
  love: {
    emojis: ["❤️", "💖", "💕", "😍", "💘", "🌹", "✨", "🥰", "💞", "💓"],
    statics: [
      ["Love is not about how many days you have spent together, but how much you care for each other ❤️", "ভালোবাসা অনেক দিন একসাথে থাকার হিসাব নয়, একে অপরের প্রতি যত্নের হিসাব ❤️"],
      ["In a world full of strangers, I found my home in you 💕", "অপরিচিত মানুষের ভিড়ে আমি তোমার মাঝেই আমার ঘর খুঁজে পেয়েছি 💕"],
      ["Loving you is the easiest thing I have ever done 😍", "তোমাকে ভালোবাসা আমার জীবনের সবচেয়ে সহজ কাজ 😍"],
      ["Every love story is beautiful, but ours is my favorite 💖", "প্রতিটি প্রেমের গল্পই সুন্দর, কিন্তু আমাদের গল্পটা আমার সবচেয়ে প্রিয় 💖"],
      ["You are the reason my heart learned to smile again 🌹", "তুমিই সেই কারণ, যার জন্য আমার হৃদয় আবার হাসতে শিখেছে 🌹"],
      ["Falling for you was not an accident; it was destiny ✨", "তোমার প্রেমে পড়া কোনো দুর্ঘটনা ছিল না; এটা ছিল ভাগ্যের লেখা ✨"],
      ["You are my favorite notification 🥰", "তুমি আমার সবচেয়ে প্রিয় নোটিফিকেশন 🥰"],
      ["Home is wherever you are 💞", "তুমি যেখানেই থাকো, সেখানেই আমার ঘর 💞"],
      ["My heart only beats for you ❤️", "আমার হৃদয় শুধু তোমার জন্যই স্পন্দিত হয় ❤️"],
      ["I never knew love until you walked into my life 💘", "তুমি আমার জীবনে আসার আগে ভালোবাসা কী তা জানতাম না 💘"],
      ["Your smile is the cure to all my problems 😍", "তোমার হাসি আমার সব সমস্যার সমাধান 😍"],
      ["Two souls, one heartbeat ❤️", "দুটি আত্মা, এক স্পন্দন ❤️"],
      ["Love you more than yesterday, less than tomorrow 💕", "গতকালের চেয়ে বেশি, আগামীকালের চেয়ে কম ভালোবাসি না — সবার চেয়ে বেশি ভালোবাসি 💕"],
      ["You make my ordinary days extraordinary ✨", "তুমি আমার সাধারণ দিনগুলোকে অসাধারণ করে দাও ✨"],
      ["Best things in life are not things; they are you 💖", "জীবনের সেরা জিনিসগুলো কোনো জিনিস নয়; সেটা হলো তুমি 💖"],
    ],
    groups: [
      {
        en: "My heart beats for you {when} {e}",
        bn: "{whenBn} তোমার জন্যই আমার হৃদয় স্পন্দিত হয় {e}",
        slots: {
          when: [
            ["every morning", "প্রতিদিন সকালে"],
            ["every night", "প্রতিরাতে"],
            ["every second", "প্রতি মুহূর্তে"],
            ["every moment", "প্রতি মোহূর্তে"],
            ["always", "সবসময়"],
            ["endlessly", "অন্তহীনভাবে"],
            ["when I wake up", "যখন ঘুম থেকে উঠি"],
            ["before I sleep", "ঘুমাতে যাওয়ার আগে"],
            ["in every heartbeat", "প্রতিটি হৃদস্পন্দনে"],
            ["forever", "চিরকাল"],
          ],
        },
      },
      {
        en: "Loving you is {adj} {e}",
        bn: "তোমাকে ভালোবাসা {adjBn} {e}",
        slots: {
          adj: [
            ["the best decision of my life", "আমার জীবনের সেরা সিদ্ধান্ত"],
            ["my greatest adventure", "আমার সবচেয়ে বড় অভিযান"],
            ["a beautiful journey", "একটি সুন্দর যাত্রা"],
            ["my favorite habit", "আমার সবচেয়ে প্রিয় অভ্যাস"],
            ["my safest place", "আমার সবচেয়ে নিরাপদ আশ্রয়"],
            ["a sweet dream", "একটি মিষ্টি স্বপ্ন"],
            ["my favorite melody", "আমার প্রিয় সুর"],
            ["the reason I smile", "আমার হাসার কারণ"],
            ["my peaceful prayer", "আমার শান্তির প্রার্থনা"],
            ["my favorite poetry", "আমার প্রিয় কবিতা"],
          ],
        },
      },
      {
        en: "In your {something}, I found {what} {e}",
        bn: "{somethingBn} আমি পেয়েছি {whatBn} {e}",
        slots: {
          something: [
            ["eyes", "তোমার চোখে"],
            ["smile", "তোমার হাসিতে"],
            ["arms", "তোমার বাহুতে"],
            ["presence", "তোমার সান্নিধ্যে"],
            ["silence", "তোমার নীরবতায়"],
            ["touch", "তোমার স্পর্শে"],
            ["voice", "তোমার কণ্ঠে"],
            ["embrace", "তোমার আলিঙ্গনে"],
          ],
          what: [
            ["my home", "আমার ঘর"],
            ["my peace", "আমার শান্তি"],
            ["my reason to smile", "হাসার কারণ"],
            ["my strength", "আমার শক্তি"],
            ["my everything", "আমার সবকিছু"],
            ["my calm", "আমার প্রশান্তি"],
            ["my purpose", "আমার উদ্দেশ্য"],
            ["my forever", "আমার চিরকাল"],
          ],
        },
      },
      {
        en: "You and I — {phrase} {e}",
        bn: "তুমি আর আমি — {phraseBn} {e}",
        slots: {
          phrase: [
            ["a story written by fate", "ভাগ্যের লেখা এক গল্প"],
            ["two hearts, one soul", "দুটি হৃদয়, এক প্রাণ"],
            ["partners in every lifetime", "প্রতি জীবনের সঙ্গী"],
            ["made for each other", "একে অপরের জন্য তৈরি"],
            ["better together", "একসাথে সেরা"],
            ["an endless love story", "এক অমৃত ভালোবাসার গল্প"],
            ["the definition of true love", "সত্যিকারের ভালোবাসার সংজ্ঞা"],
            ["a match made in heaven", "স্বর্গে তৈরি মিল"],
          ],
        },
      },
      {
        en: "{when} I see you, {feeling} {e}",
        bn: "{whenBn} তোমাকে দেখি, {feelingBn} {e}",
        slots: {
          when: [
            ["Every time", "যতবার"],
            ["Whenever", "যখনই"],
            ["Each moment", "প্রতিবার"],
            ["Every day", "প্রতিদিন"],
          ],
          feeling: [
            ["my heart dances", "আমার হৃদয় নেচে ওঠে"],
            ["my worries fade away", "আমার সব দুশ্চিন্তা উড়ে যায়"],
            ["the world stops for a second", "পৃথিবী এক মুহূর্ত থেমে যায়"],
            ["my day becomes beautiful", "আমার দিনটা সুন্দর হয়ে যায়"],
            ["everything feels right", "সবকিছু ঠিক মনে হয়"],
            ["my smile becomes real", "আমার হাসি সত্যিকারের হয়ে ওঠে"],
            ["my heart skips a beat", "আমার হৃদস্পন্দন এড়িয়ে যায়"],
          ],
        },
      },
      {
        en: "You are the {noun} I never knew I needed {e}",
        bn: "তুমি সেই {nounBn}, যা আমার দরকার ছিল কিন্তু আমি জানতাম না {e}",
        slots: {
          noun: [
            ["light", "আলো"],
            ["answer", "উত্তর"],
            ["dream", "স্বপ্ন"],
            ["miracle", "অলৌকিক ঘটনা"],
            ["blessing", "রহমত"],
            ["star", "তারা"],
            ["moonlight", "চাঁদের আলো"],
            ["serenity", "প্রশান্তি"],
          ],
        },
      },
      {
        en: "Distance means nothing when someone means everything {e}",
        bn: "দূরত্বের মানে কিছুই নয়, যখন কেউ একজন তোমার কাছে সবকিছু {e}",
        slots: {},
      },
      {
        en: "I loved you {when} and I will love you {forever} {e}",
        bn: "{whenBn} আমি তোমাকে ভালোবেসেছি এবং {foreverBn} ভালোবাসব {e}",
        slots: {
          when: [
            ["from the first moment", "প্রথম মুহূর্ত থেকেই"],
            ["from the day we met", "আমাদের প্রথম দেখা হওয়ার দিন থেকে"],
            ["since forever", "চিরকাল ধরেই"],
            ["from the first hello", "প্রথম 'হ্যালো' থেকেই"],
          ],
          forever: [
            ["forever", "চিরকাল"],
            ["till the end of time", "সময়ের শেষ পর্যন্ত"],
            ["in this life and beyond", "এই জীবনে এবং তার পরেও"],
            ["more than yesterday", "গতকালের চেয়েও বেশি"],
            ["to the moon and back", "চাঁদ পর্যন্ত আর ফিরে"],
            ["until the stars go out", "তারা নিভে যাওয়া পর্যন্ত"],
          ],
        },
      },
      {
        en: "Some love stories are written in stars; ours is written in {thing} {e}",
        bn: "কিছু প্রেমের গল্প লেখা হয় তারাদের দিয়ে; আমাদেরটা লেখা {thingBn} {e}",
        slots: {
          thing: [
            ["our hearts", "আমাদের হৃদয়ে"],
            ["every glance", "প্রতিটি চাহনিতে"],
            ["shared smiles", "ভাগ করে নেওয়া হাসিতে"],
            ["quiet moments", "নীরব মুহূর্তগুলোতে"],
            ["every conversation", "প্রতিটি কথোপকথনে"],
            ["our dreams", "আমাদের স্বপ্নে"],
          ],
        },
      },
      {
        en: "Thank you for being my {role} {e}",
        bn: "আমার {roleBn} হওয়ার জন্য ধন্যবাদ {e}",
        slots: {
          role: [
            ["best friend", "সেরা বন্ধু"],
            ["forever partner", "চিরন্তন সঙ্গী"],
            ["greatest support", "সবচেয়ে বড় ভরসা"],
            ["safe harbor", "নিরাপদ আশ্রয়"],
            ["reason to smile", "হাসির কারণ"],
            ["shoulder to lean on", "ভরসার কাঁধ"],
          ],
        },
      },
    ],
  },

  friendship: {
    emojis: ["🤝", "💛", "😄", "✌️", "🎉", "👫", "🌟", "💫", "🥂", "🤗"],
    statics: [
      ["A real friend is the one who walks in when the whole world walks out 🤝", "সত্যিকারের বন্ধু সেই, যে গোটা পৃথিবী দূরে চলে গেলেও তোমার পাশে এসে দাঁড়ায় 🤝"],
      ["Friends are the family we choose for ourselves 👫", "বন্ধুরা হলো সেই পরিবার, যাকে আমরা নিজেরা বেছে নিই 👫"],
      ["Some friendships are made in a minute and last a lifetime 🌟", "কিছু বন্ধুত্ব এক মুহূর্তে তৈরি হয়, কিন্তু থাকে সারা জীবন 🌟"],
      ["A day without a friend is like a pot without a single drop of honey 💛", "বন্ধুহীন একটি দিনও তেমন, যেমন মধুশূন্য একটি ঘড়া 💛"],
      ["Good friends are like stars — you don't always see them, but you know they're always there ✨", "ভালো বন্ধুরা তারাদের মতো — সবসময় দেখা যায় না, কিন্তু জানো তারা সবসময় আছে ✨"],
      ["A friend is someone who knows the song in your heart and sings it back to you when you forget 🎵", "বন্ধু সেই, যে তোমার হৃদয়ের গান চেনে এবং তুমি ভুলে গেলে গেয়ে শোনায় 🎵"],
      ["Side by side or miles apart, real friends are always close to the heart 💛", "পাশাপাশি থাকো বা মাইল দূরে, সত্যিকারের বন্ধুরা সবসময় হৃদয়ের কাছেই থাকে 💛"],
      ["Friendship isn't a big thing — it's a million little things 🤝", "বন্ধুত্ব বড় কিছু নয় — এটা লক্ষ ছোট ছোট জিনিস 🤝"],
      ["A friend is what the heart needs all the time 💫", "বন্ধু হলো এমন কিছু, যা হৃদয়ের সবসময় প্রয়োজন 💫"],
      ["True friends are never apart, maybe in distance but never in heart 🌟", "সত্যিকারের বন্ধুরা কখনো আলাদা হয় না, দূরত্বে থাকতে পারে কিন্তু হৃদয়ে নয় 🌟"],
      ["Laughter is not a bad start for a friendship, and laughter is the best ending for one 🎉", "হাসি বন্ধুত্বের খারাপ শুরু নয়, আর হাসিই বন্ধুত্বের সেরা সমাপ্তিও 🎉"],
      ["A friend like you is a rare treasure ✨", "তোমার মতো বন্ধু এক দুর্লভ ধন ✨"],
    ],
    groups: [
      {
        en: "A friend like you is a {gift} {e}",
        bn: "তোমার মতো বন্ধু {giftBn} {e}",
        slots: {
          gift: [
            ["rare gift", "এক দুর্লভ উপহার"],
            ["blessing", "এক আশীর্বাদ"],
            ["treasure", "এক ধন"],
            ["once-in-a-lifetime gift", "জীবনে একবার পাওয়া উপহার"],
            ["blessing from above", "উপর থেকে পাওয়া আশীর্বাদ"],
            ["priceless gem", "মূল্যবান রত্ন"],
            ["lucky charm", "ভাগ্যের প্রতীক"],
            ["reason to laugh", "হাসার কারণ"],
          ],
        },
      },
      {
        en: "We laughed, we cried, we {did} — together {e}",
        bn: "আমরা হেসেছি, কেঁদেছি, {didBn} — সব একসাথে {e}",
        slots: {
          did: [
            ["grew", "বড় হয়েছি"],
            ["dreamed", "স্বপ্ন দেখেছি"],
            ["survived", "বেঁচে থেকেছি"],
            ["partied", "মজা করেছি"],
            ["failed and tried again", "ব্যর্থ হয়ে আবার চেষ্টা করেছি"],
            ["laughed till we cried", "কেঁদে ফেলার মতো হেসেছি"],
            ["made memories", "স্মৃতি বানিয়েছি"],
            ["fought and made up", "ঝগড়া করে আবার মিলেছি"],
          ],
        },
      },
      {
        en: "Some people make the world special just by being in it. That's you, {e}",
        bn: "কিছু মানুষ শুধু থাকার কারণেই পৃথিবীটাকে বিশেষ করে তোলে। তুমি তেমনই, {e}",
        slots: {},
      },
      {
        en: "Friends are the family we {verb} {e}",
        bn: "বন্ধুরা হলো সেই পরিবার, যাকে আমরা {verbBn} {e}",
        slots: {
          verb: [
            ["choose", "নিজে বেছে নিই"],
            ["create", "নিজে তৈরি করি"],
            ["keep close", "বুকে ধরে রাখি"],
            ["find along the way", "পথে পথে খুঁজে পাই"],
            ["grow up with", "সাথে সাথে বড় হই"],
            ["never let go of", "কখনো ছাড়ি না"],
          ],
        },
      },
      {
        en: "With you, {moment} feels like {celebration} {e}",
        bn: "তোমার সাথে {momentBn}ও মনে হয় {celebrationBn} {e}",
        slots: {
          moment: [
            ["even a boring day", "একটি নিস্তেজ দিনও"],
            ["a simple cup of tea", "এক কাপ সাধারণ চাও"],
            ["the longest queue", "সবচেয়ে লম্বা লাইনও"],
            ["a rainy evening", "বৃষ্টির সন্ধ্যাও"],
            ["a long bus ride", "লম্বা বাস যাত্রাও"],
            ["even a traffic jam", "ট্রাফিক জ্যামও"],
          ],
          celebration: [
            ["a festival", "উৎসব"],
            ["a party", "পার্টি"],
            ["an adventure", "অ্যাডভেঞ্চার"],
            ["a celebration", "উদযাপন"],
            ["a mini-vacation", "ছোট ছুটি"],
            ["pure fun", "বিশুদ্ধ মজা"],
          ],
        },
      },
      {
        en: "True friendship isn't about being inseparable; it's about being separated and nothing changes {e}",
        bn: "সত্যিকারের বন্ধুত্ব মানে সবসময় পাশে থাকা নয়; বরং দূরে থাকলেও কিছু না বদলে যাওয়া {e}",
        slots: {},
      },
      {
        en: "A shoulder to cry on and a reason to smile — that's {what} {e}",
        bn: "কান্নার জন্য কাঁধ আর হাসির জন্য কারণ — এটাই {whatBn} {e}",
        slots: {
          what: [
            ["friendship", "বন্ধুত্ব"],
            ["you", "তুমি"],
            ["a true friend", "সত্যিকারের বন্ধু"],
            ["what you mean to me", "তুমি আমার কাছে যা"],
            ["our bond", "আমাদের বন্ধন"],
          ],
        },
      },
      {
        en: "Distance and time can't break a bond built with {thing} {e}",
        bn: "দূরত্ব আর সময় ভাঙতে পারে না সেই বন্ধন, যা {thingBn} {e}",
        slots: {
          thing: [
            ["trust", "ভরসা দিয়ে গড়া"],
            ["laughter", "হাসি দিয়ে গড়া"],
            ["love", "ভালোবাসা দিয়ে গড়া"],
            ["memories", "স্মৃতি দিয়ে গড়া"],
            ["loyalty", "আনুগত্য দিয়ে গড়া"],
            ["honesty", "সততা দিয়ে গড়া"],
          ],
        },
      },
      {
        en: "I'd rather walk with a friend in the dark than alone in the light {e}",
        bn: "আলোতে একা হাঁটার চেয়ে বন্ধুর সাথে অন্ধকারে হাঁটাই ভালো {e}",
        slots: {},
      },
      {
        en: "You're not just my friend, you're my {noun} {e}",
        bn: "তুমি শুধু আমার বন্ধু নও, তুমি আমার {nounBn} {e}",
        slots: {
          noun: [
            ["partner in crime", "সাথী"],
            ["soulmate", "আত্মার বন্ধু"],
            ["brother from another mother", "ভাইয়ের মতো"],
            ["sister from another mister", "বোনের মতো"],
            ["family", "পরিবার"],
            ["home away from home", "বাড়ির মতো জায়গা"],
            ["confidant", "বিশ্বাসভাজন"],
            ["my person", "আমার মানুষ"],
          ],
        },
      },
      {
        en: "You're the one I call when {moment} {e}",
        bn: "তুমি সেই মানুষ, যাকে আমি ফোন করি {momentBn} {e}",
        slots: {
          moment: [
            ["I need a laugh", "যখন আমার হাসির দরকার হয়"],
            ["I'm overthinking", "যখন আমি অতিরিক্ত ভাবি"],
            ["I need advice", "যখন আমার পরামর্শ দরকার হয়"],
            ["good news arrives", "যখন সুখবর আসে"],
            ["I feel lost", "যখন আমি হারিয়ে যাই"],
            ["I need a pep talk", "যখন আমার উৎসাহ দরকার হয়"],
            ["I can't decide", "যখন কিছু ঠিক করতে পারি না"],
            ["I miss home", "যখন বাড়ির কথা মনে পড়ে"],
          ],
        },
      },
      {
        en: "Through {tough} and {good}, you always stayed {e}",
        bn: "{toughBn} আর {goodBn} — সব সময় তুমি আমার পাশেই থেকেছ {e}",
        slots: {
          tough: [
            ["the stormy days", "ঝড়ের দিনগুলোতে"],
            ["my darkest hours", "আমার অন্ধকার মুহূর্তগুলোতে"],
            ["every failure", "প্রতিটি ব্যর্থতায়"],
            ["the painful nights", "কষ্টের রাতগুলোতে"],
            ["my lowest moments", "আমার সবচেয়ে খারাপ সময়ে"],
            ["every heartbreak", "প্রতিটি ভেঙে যাওয়ায়"],
            ["the long silences", "দীর্ঘ নীরবতায়"],
            ["the uncertain paths", "অনিশ্চিত পথগুলোতে"],
          ],
          good: [
            ["the sunny days", "রৌদ্রোজ্জ্বল দিনগুলোতে"],
            ["every success", "প্রতিটি সাফল্যে"],
            ["the celebrations", "উদযাপনগুলোতে"],
            ["the happy tears", "আনন্দের অশ্রুতে"],
            ["my proud moments", "আমার গর্বের মুহূর্তগুলোতে"],
            ["every new beginning", "প্রতিটি নতুন শুরুতে"],
            ["the midnight talks", "মধ্যরাতের আড্ডায়"],
            ["the silly fights", "অর্থহীন ঝগড়াগুলোতেও"],
          ],
        },
      },
    ],
  },

  sad: {
    emojis: ["😢", "💔", "😔", "🌧️", "🥀", "🕯️", "💧", "🤍", "🌑", "🖤"],
    statics: [
      ["It hurts the most when the person who made you smile becomes the reason you cry 💔", "সবচেয়ে বেশি কষ্ট হয় তখন, যখন যে মানুষটা তোমাকে হাসাতো, সেই-ই হয়ে ওঠে তোমার কান্নার কারণ 💔"],
      ["Sometimes silence is the loudest cry 😢", "কখনো কখনো নীরবতাই সবচেয়ে উচ্চকণ্ঠ কান্না 😢"],
      ["The hardest part is pretending you are fine when you are falling apart inside 💔", "সবচেয়ে কঠিন হলো ভেতরে ভেঙে পড়েও বাইরে ঠিক আছি—এটা দেখানো 💔"],
      ["Not everyone who smiles is happy. Some smiles are just a mask 😔", "যারা হাসে, তারা সবাই সুখী নয়। কিছু হাসি শুধুই মুখোশ 😔"],
      ["Tears are words the heart can't say 💧", "অশ্রু হলো সেই কথা, যা হৃদয় বলতে পারে না 💧"],
      ["The worst kind of pain is when your heart is breaking in slow motion 😢", "সবচেয়ে খারাপ ব্যথা হলো, যখন তোমার হৃদয় স্লো মোশনে ভাঙতে থাকে 😢"],
      ["I smiled so much today, it almost felt real 😔", "আজ এত হাসলাম, প্রায় সত্যি মনে হচ্ছিল 😔"],
      ["You can't heal what you keep hidden 🌧️", "যা লুকিয়ে রাখো, তা সারাতে পারো না 🌧️"],
      ["Some people come into your life as blessings and leave as lessons 🥀", "কিছু মানুষ আশীর্বাদ হয়ে আসে আর পাঠ হয়ে চলে যায় 🥀"],
      ["Grief is just love with nowhere to go 🕯️", "দুঃখ হলো সেই ভালোবাসা, যার যাওয়ার জায়গা নেই 🕯️"],
      ["It's okay to fall apart sometimes. Flowers do too, and they bloom again 🌧️", "মাঝে মাঝে ভেঙে পড়া ঠিক আছে। ফুলও ভেঙে পড়ে, আবার ফোটেও 🌧️"],
      ["The loneliest moment is when you're surrounded by people and still feel alone 🖤", "সবচেয়ে নিঃসঙ্গ মুহূর্ত সেই, যখন মানুষের ভিড়ে থেকেও নিজেকে একা মনে হয় 🖤"],
    ],
    groups: [
      {
        en: "It hurts when the {person} becomes the reason for your tears {e}",
        bn: "যে {personBn} তোমার কান্নার কারণ হয়ে ওঠে, তখন খুব কষ্ট হয় {e}",
        slots: {
          person: [
            ["person you trusted", "তুমি যাকে বিশ্বাস করেছিলে"],
            ["one you loved the most", "যাকে সবচেয়ে বেশি ভালোবাসতে"],
            ["best friend", "সেরা বন্ধু"],
            ["one who promised forever", "যে চিরকালের প্রতিশ্রুতি দিয়েছিল"],
            ["one you shared everything with", "যার সাথে সবকিছু ভাগ করে নিতে"],
            ["one who knew you best", "যে তোমাকে সবচেয়ে ভালো চিনত"],
          ],
        },
      },
      {
        en: "I smile during the day and {do} at night {e}",
        bn: "দিনে হাসি, আর রাতে {doBn} {e}",
        slots: {
          do: [
            ["cry silently", "নীরবে কাঁদি"],
            ["replay old memories", "পুরনো স্মৃতি মনে করি"],
            ["miss you", "তোমাকে মনে করি"],
            ["wonder what went wrong", "কী ভুল হলো তা ভাবি"],
            ["wish things were different", "কী হলে ভালো হতো তা ভাবি"],
            ["count my regrets", "আফসোসগুলো গুনি"],
          ],
        },
      },
      {
        en: "The hardest goodbye is the one {when} {e}",
        bn: "সবচেয়ে কঠিন বিদায় সেই বিদায়, {whenBn} {e}",
        slots: {
          when: [
            ["that was never said", "যা বলা হয়নি"],
            ["that came too early", "যা অনেক আগেই এসেছিল"],
            ["you never saw coming", "যা আসবে তুমি বুঝতেই পারোনি"],
            ["that left everything unsaid", "যা অসমাপ্ত কথাগুলো রেখে গেছে"],
            ["you had to smile through", "যার সময় হাসতে হয়েছিল"],
            ["that hurt the most", "যা সবচেয়ে বেশি কষ্ট দিয়েছে"],
          ],
        },
      },
      {
        en: "Sometimes the people who {do} are the ones who {result} {e}",
        bn: "কখনো কখনো যারা {doBn}, তারাই {resultBn} {e}",
        slots: {
          do: [
            ["promise forever", "চিরকালের প্রতিশ্রুতি দেয়"],
            ["seem the closest", "সবচেয়ে কাছের মনে হয়"],
            ["love you the most", "সবচেয়ে বেশি ভালোবাসে"],
            ["swear by your side", "তোমার পাশে থাকার শপথ করে"],
          ],
          result: [
            ["leave first", "সবার আগে চলে যায়"],
            ["hurt you the most", "সবচেয়ে বেশি কষ্ট দেয়"],
            ["forget you", "তোমাকে ভুলে যায়"],
            ["break your heart", "তোমার হৃদয় ভেঙে দেয়"],
          ],
        },
      },
      {
        en: "I'm not crying because I'm weak. I'm crying because I've been strong for too long {e}",
        bn: "আমি দুর্বল বলে কাঁদছি না। অনেকদিন ধরে শক্ত থাকায় কাঁদছি {e}",
        slots: {},
      },
      {
        en: "Behind my smile is a story you {do} {e}",
        bn: "আমার হাসির পেছনে এমন একটি গল্প আছে, যা তুমি {doBn} {e}",
        slots: {
          do: [
            ["never heard", "শোনোনি"],
            ["never asked about", "কখনো জিজ্ঞেস করোনি"],
            ["wouldn't understand", "বুঝতে পারবে না"],
            ["will never see", "কখনো দেখতে পাবে না"],
            ["don't care to know", "জানতে চাও না"],
            ["can't even imagine", "কল্পনাও করতে পারবে না"],
          ],
        },
      },
      {
        en: "Missing someone is {how} {e}",
        bn: "কারো অনুপস্থিতি মনে করাটা {howBn} {e}",
        slots: {
          how: [
            ["a quiet ache", "নিঃশব্দ ব্যথার মতো"],
            ["loving someone from a distance", "দূর থেকে কাউকে ভালোবাসার মতো"],
            ["remembering the good times", "ভালো সময়গুলোকে মনে করার মতো"],
            ["a wound that heals slowly", "ধীরে সেরে ওঠা ক্ষতের মতো"],
            ["a song stuck on repeat", "বারবার বাজতে থাকা গানের মতো"],
            ["an empty chair at the table", "টেবিলের পাশে খালি চেয়ারের মতো"],
          ],
        },
      },
      {
        en: "Some {thing} are better left unsaid {e}",
        bn: "কিছু {thingBn} না বলাই ভালো {e}",
        slots: {
          thing: [
            ["feelings", "অনুভূতি"],
            ["words", "কথা"],
            ["memories", "স্মৃতি"],
            ["questions", "প্রশ্ন"],
            ["goodbyes", "বিদায়"],
            ["apologies", "ক্ষমাপ্রার্থনা"],
          ],
        },
      },
      {
        en: "It's okay to {do}. Healing takes time {e}",
        bn: "এটা ঠিক আছে, {doBn}। সুস্থ হতে সময় লাগে {e}",
        slots: {
          do: [
            ["not be okay", "ভালো না থাকাটাও"],
            ["cry", "কাঁদাটাও"],
            ["take a break", "বিরতি নেওয়াটাও"],
            ["feel lost", "হারিয়ে যাওয়াটাও"],
            ["start over", "আবার শুরু করাটাও"],
            ["let go", "ছেড়ে দেওয়াটাও"],
          ],
        },
      },
      {
        en: "The rain reminds me that storms don't last forever, but the memories do {e}",
        bn: "বৃষ্টি মনে করিয়ে দেয় ঝড় চিরকাল থাকে না, কিন্তু স্মৃতিগুলো থেকে যায় {e}",
        slots: {},
      },
      {
        en: "Every {time}, I {feel} {e}",
        bn: "প্রতি {timeBn}ই, {feelBn} {e}",
        slots: {
          time: [
            ["night", "রাতে"],
            ["sunset", "সূর্যাস্তে"],
            ["silent hour", "নীরব সময়ে"],
            ["rainy day", "বৃষ্টির দিনে"],
            ["lonely moment", "নিঃসঙ্গ মুহূর্তে"],
            ["quiet walk", "নীরব হাঁটায়"],
            ["sleepless hour", "ঘুমহীন ঘণ্টায়"],
            ["old song", "পুরনো গানে"],
          ],
          feel: [
            ["the emptiness grows", "শূন্যতা বেড়ে যায়"],
            ["your absence hurts", "তোমার অনুপস্থিতি কষ্ট দেয়"],
            ["memories come flooding back", "স্মৃতিগুলো ভেসে আসে"],
            ["I miss your voice", "তোমার কণ্ঠের অভাব অনুভব করি"],
            ["the silence speaks", "নীরবতা কথা বলে"],
            ["my heart feels heavy", "আমার মন ভারী হয়ে যায়"],
            ["I count my regrets", "আফসোসগুলো গুনি"],
            ["time feels frozen", "সময় থেমে আছে মনে হয়"],
          ],
        },
      },
      {
        en: "When {thing} fades, what remains is {what} {e}",
        bn: "যখন {thingBn} শেষ হয়ে যায়, তখন থেকে যায় {whatBn} {e}",
        slots: {
          thing: [
            ["the laughter", "হাসিগুলো"],
            ["the promises", "প্রতিশ্রুতিগুলো"],
            ["the good days", "ভালো দিনগুলো"],
            ["the feelings", "অনুভূতিগুলো"],
            ["the warmth", "আন্তরিকতা"],
            ["the togetherness", "একসাথে থাকা"],
            ["the trust", "ভরসাটা"],
            ["the words", "কথাগুলো"],
          ],
          what: [
            ["the silence", "নীরবতা"],
            ["the memories", "স্মৃতিগুলো"],
            ["the pain", "ব্যথা"],
            ["the questions", "প্রশ্নগুলো"],
            ["the lessons", "পাঠগুলো"],
            ["the scars", "দাগগুলো"],
            ["the truth", "সত্যিটা"],
            ["the longing", "আকুতি"],
          ],
        },
      },
    ],
  },

  motivation: {
    emojis: ["🔥", "💪", "🚀", "⚡", "🌟", "🏆", "🎯", "✨", "🌄", "🏔️"],
    statics: [
      ["Success is not final, failure is not fatal — it's the courage to continue that counts 🔥", "সাফল্য চূড়ান্ত নয়, ব্যর্থতা প্রাণঘাতী নয় — চালিয়ে যাওয়ার সাহসই আসল 🔥"],
      ["Don't watch the clock; do what it does. Keep going ⏰", "ঘড়ির দিকে তাকিয়ে থেকো না; ঘড়ি যা করে তাই করো—চলতে থাকো ⏰"],
      ["Your only limit is the one you set in your mind 🧠", "তোমার একমাত্র সীমা হলো সেই সীমা, যা তুমি নিজের মনের ভেতরে তৈরি করো 🧠"],
      ["Dream big, start small, but most importantly, start 🚀", "বড় স্বপ্ন দেখো, ছোট থেকে শুরু করো, কিন্তু সবচেয়ে গুরুত্বপূর্ণ হলো—শুরু করো 🚀"],
      ["It always seems impossible until it's done 🌟", "কাজ শেষ না হওয়া পর্যন্ত সবসময়ই অসম্ভব মনে হয় 🌟"],
      ["Don't be afraid to give up the good to go for the great 💪", "ভালোর জন্য খারাপ, আর মহানের জন্য ভালোকেও ছাড়তে ভয় পেও না 💪"],
      ["The secret of getting ahead is getting started ✨", "এগিয়ে যাওয়ার রহস্য হলো শুরু করাই ✨"],
      ["Push yourself, because no one else is going to do it for you 🔥", "নিজেকে ঠেলে দাও, কারণ তোমার হয়ে আর কেউ এটা করবে না 🔥"],
      ["Great things never come from comfort zones 🏔️", "মহান জিনিসগুলো কখনো আরামের জায়গা থেকে আসে না 🏔️"],
      ["Fall seven times, stand up eight 🌄", "সাতবার পড়ো, আটবার উঠে দাঁড়াও 🌄"],
      ["Hard work beats talent when talent doesn't work hard 🏆", "প্রতিভা যখন পরিশ্রম করে না, তখন পরিশ্রমই প্রতিভাকে হারিয়ে দেয় 🏆"],
      ["The only way to do great work is to love what you do ❤️", "মহান কাজ করার একমাত্র উপায় হলো যা করো তা ভালোবাসা ❤️"],
    ],
    groups: [
      {
        en: "Don't wait for the perfect moment. Take the moment and make it {adj} {e}",
        bn: "নিখুঁত মুহূর্তের অপেক্ষায় থেকো না। মুহূর্তটাকে নাও এবং {adjBn} করে ফেলো {e}",
        slots: {
          adj: [
            ["perfect", "নিখুঁত"],
            ["memorable", "স্মরণীয়"],
            ["great", "দারুণ"],
            ["countable", "গণনা করার মতো"],
            ["worth it", "মূল্যবান"],
            ["yours", "নিজের"],
          ],
        },
      },
      {
        en: "Small {step} lead to {big} {e}",
        bn: "ছোট {stepBn} নিয়ে যায় {bigBn} {e}",
        slots: {
          step: [
            ["steps", "পদক্ষেপ"],
            ["habits", "অভ্যাস"],
            ["efforts", "চেষ্টা"],
            ["wins", "জয়"],
            ["choices", "পছন্দ"],
            ["sacrifices", "ত্যাগ"],
          ],
          big: [
            ["big destinations", "বড় গন্তব্যে"],
            ["great results", "দারুণ ফলাফলে"],
            ["mountain-top moments", "শিখরে পৌঁছানোর মুহূর্তে"],
            ["extraordinary lives", "অসাধারণ জীবন"],
            ["dreams come true", "স্বপ্ন পূরণে"],
          ],
        },
      },
      {
        en: "You don't have to be great to start, but you have to start to be great {e}",
        bn: "শুরু করার জন্য মহান হতে হয় না, কিন্তু মহান হতে হলে শুরু করতেই হয় {e}",
        slots: {},
      },
      {
        en: "Every morning is a new {chance} to {do} {e}",
        bn: "প্রতিটি সকাল হলো {doBn} নতুন {chanceBn} {e}",
        slots: {
          chance: [
            ["chance", "সুযোগ"],
            ["beginning", "শুরু"],
            ["chapter", "অধ্যায়"],
            ["page", "পাতা"],
            ["invitation", "আমন্ত্রণ"],
            ["gift", "উপহার"],
          ],
          do: [
            ["rewrite your story", "নিজের গল্প নতুন করে লেখার"],
            ["chase your dreams", "স্বপ্নের পেছনে ছুটার"],
            ["become better", "ভালো হয়ে ওঠার"],
            ["change direction", "দিক বদলানোর"],
            ["smile more", "আরও হাসার"],
            ["take one step forward", "এক ধাপ এগোনোর"],
          ],
        },
      },
      {
        en: "The harder the {struggle}, the sweeter the {victory} {e}",
        bn: "যত কঠিন {struggleBn}, তত মিষ্টি {victoryBn} {e}",
        slots: {
          struggle: [
            ["battle", "লড়াই"],
            ["climb", "আরোহণ"],
            ["journey", "যাত্রা"],
            ["fight", "সংগ্রাম"],
            ["night", "রাত"],
            ["test", "পরীক্ষা"],
          ],
          victory: [
            ["win", "জয়"],
            ["success", "সাফল্য"],
            ["reward", "ফলাফল"],
            ["joy", "আনন্দ"],
            ["sunrise", "সূর্যোদয়"],
            ["prize", "পুরস্কার"],
          ],
        },
      },
      {
        en: "Don't be afraid to {do} slowly. Be afraid to stand still {e}",
        bn: "ধীরে {doBn} ভয় নেই। স্থির হয়ে দাঁড়িয়ে থাকাটাই ভয়ের {e}",
        slots: {
          do: [
            ["move", "এগোনো"],
            ["grow", "বেড়ে ওঠা"],
            ["learn", "শেখা"],
            ["change", "বদলানো"],
            ["fail", "ব্যর্থ হওয়া"],
            ["begin", "শুরু করা"],
          ],
        },
      },
      {
        en: "Stars can't shine without {element} {e}",
        bn: "তারা জ্বলতে পারে না {elementBn} ছাড়া {e}",
        slots: {
          element: [
            ["darkness", "অন্ধকার"],
            ["struggle", "সংগ্রাম"],
            ["time", "সময়"],
            ["patience", "ধৈর্য"],
            ["sacrifice", "ত্যাগ"],
            ["hard times", "কঠিন সময়"],
          ],
        },
      },
      {
        en: "Believe in yourself, and {result} will follow {e}",
        bn: "নিজের উপর বিশ্বাস রাখো, {resultBn} পেছনে আসবেই {e}",
        slots: {
          result: [
            ["success", "সাফল্য"],
            ["miracles", "অলৌকিক ঘটনা"],
            ["great things", "মহান কিছু"],
            ["your dreams", "তোমার স্বপ্নগুলো"],
            ["the impossible", "অসম্ভব"],
            ["victory", "জয়"],
          ],
        },
      },
      {
        en: "Make your {thing} proud {e}",
        bn: "তোমার {thingBn} কে গর্বিত করো {e}",
        slots: {
          thing: [
            ["parents", "বাবা-মাকে"],
            ["future self", "ভবিষ্যতের নিজেকে"],
            ["teachers", "শিক্ষকদের"],
            ["family", "পরিবারকে"],
            ["village", "নিজের গ্রামকে"],
            ["city", "নিজের শহরকে"],
          ],
        },
      },
      {
        en: "Opportunities don't happen. You {do} them {e}",
        bn: "সুযোগ নিজে থেকে আসে না। তুমি {doBn} {e}",
        slots: {
          do: [
            ["create", "সেগুলো তৈরি করো"],
            ["chase", "সেগুলোর পেছনে ছুটো"],
            ["grab", "সেগুলো ধরে ফেলো"],
            ["build", "সেগুলো গড়ে তোলো"],
            ["deserve", "সেগুলোর যোগ্য হও"],
          ],
        },
      },
    ],
  },

  islamic: {
    emojis: ["🕌", "🤲", "📿", "☪️", "🌙", "📖", "🕋", "✨", "🍃", "💚"],
    statics: [
      ["Verily, with hardship comes ease — Quran 94:6 🌙", "নিশ্চয়ই কষ্টের সাথে রয়েছে স্বস্তি — কুরআন ৯৪:৬ 🌙"],
      ["Indeed, Allah is with the patient — Quran 2:153 🤲", "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন — কুরআন ২:১৫৩ 🤲"],
      ["Put your trust in Allah, for He is the best of planners 🕌", "আল্লাহর উপর ভরসা রাখো, তিনিই তো সর্বোত্তম পরিকল্পনাকারী 🕌"],
      ["When the world closes every door, remember Allah has a window ✨", "যখন পৃথিবী তোমার সব দরজা বন্ধ করে দেয়, মনে রেখো আল্লাহর কাছে একটা জানালা আছে ✨"],
      ["Tie your camel and trust in Allah 🐫", "তোমার উট বেঁধে রাখো, আর আল্লাহর উপর ভরসা করো 🐫"],
      ["The best among you are those who learn the Quran and teach it 📖", "তোমাদের মধ্যে সে-ই সর্বোত্তম, যে কুরআন শেখে এবং অপরকে শেখায় 📖"],
      ["Allah does not burden a soul beyond that it can bear — Quran 2:286 🌙", "আল্লাহ কারো উপর তার ক্ষমতার বাইরে বোঝা চাপান না — কুরআন ২:২৮৬ 🌙"],
      ["Your heart finds rest only in the remembrance of Allah — Quran 13:28 🕋", "আল্লাহর স্মরণেই হৃদয় প্রশান্তি পায় — কুরআন ১৩:২৮ 🕋"],
      ["So remember Me; I will remember you — Quran 2:152 🤲", "তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করব — কুরআন ২:১৫২ 🤲"],
      ["Every tear shed in dua reaches Allah's throne 📿", "দোয়ায় ঝরানো প্রতিটি অশ্রু আল্লাহর আরশে পৌঁছে 📿"],
      ["This world is a moment, so fill that moment with worship and gratitude 🕌", "দুনিয়া হলো এক মুহূর্ত, তাই এই মুহূর্তটাকে পূর্ণ করুন ইবাদত ও কৃতজ্ঞতায় 🕌"],
      ["Be content with what Allah has written for you, and your heart will be at peace 🍃", "আল্লাহ যা লিখে রেখেছেন তাতে সন্তুষ্ট থাকো, তোমার হৃদয় শান্তিতে থাকবে 🍃"],
    ],
    groups: [
      {
        en: "The beauty of Islam is that it {teaches} {e}",
        bn: "ইসলামের সৌন্দর্য হলো, এটি {teachesBn} {e}",
        slots: {
          teaches: [
            ["teaches patience in difficulty", "কষ্টে ধৈর্য ধরতে শেখায়"],
            ["teaches gratitude in ease", "আরামে কৃতজ্ঞতা শেখায়"],
            ["brings peace to the heart", "হৃদয়ে শান্তি আনে"],
            ["connects you to your Creator", "তোমাকে সৃষ্টিকর্তার সাথে যুক্ত করে"],
            ["purifies the soul", "আত্মাকে পরিশুদ্ধ করে"],
            ["guides every step of life", "জীবনের প্রতিটি পদক্ষেপে পথ দেখায়"],
          ],
        },
      },
      {
        en: "Your prayers are never wasted. Allah hears every {word} {e}",
        bn: "তোমার দোয়া কখনো বৃথা যায় না। আল্লাহ প্রতিটি {wordBn} শোনেন {e}",
        slots: {
          word: [
            ["dua", "দোয়া"],
            ["whisper", "ফিসফিস"],
            ["tear", "অশ্রু"],
            ["prayer", "প্রার্থনা"],
            ["plea", "আবেদন"],
            ["sigh", "নিঃশ্বাস"],
          ],
        },
      },
      {
        en: "The heart that remembers Allah in {time} finds peace in {place} {e}",
        bn: "যে হৃদয় {timeBn} আল্লাহকে স্মরণ করে, সে {placeBn} শান্তি পায় {e}",
        slots: {
          time: [
            ["solitude", "নিঃসঙ্গতায়"],
            ["trials", "পরীক্ষায়"],
            ["prosperity", "প্রাচুর্যে"],
            ["the dead of night", "নিশীথ রাতে"],
            ["difficult days", "কঠিন দিনগুলোতে"],
            ["easy days", "সহজ দিনগুলোতে"],
          ],
          place: [
            ["this life", "এই জীবনেও"],
            ["hardship", "কষ্টেও"],
            ["every situation", "প্রতিটি পরিস্থিতিতে"],
            ["its darkness", "তার অন্ধকারেও"],
            ["every season", "প্রতিটি ঋতুতে"],
          ],
        },
      },
      {
        en: "Dunya is temporary, {thing} is eternal {e}",
        bn: "দুনিয়া ক্ষণস্থায়ী, {thingBn} চিরস্থায়ী {e}",
        slots: {
          thing: [
            ["akhirah", "আখিরাত"],
            ["the hereafter", "পরকাল"],
            ["your good deeds", "তোমার ভালো কাজগুলো"],
            ["your relationship with Allah", "আল্লাহর সাথে তোমার সম্পর্ক"],
            ["true success", "সত্যিকারের সাফল্য"],
            ["jannah", "জান্নাত"],
          ],
        },
      },
      {
        en: "Every test from Allah comes with {gift} {e}",
        bn: "আল্লাহর প্রতিটি পরীক্ষার সাথে থাকে {giftBn} {e}",
        slots: {
          gift: [
            ["mercy", "রহমত"],
            ["growth", "উন্নতি"],
            ["reward", "পুরস্কার"],
            ["forgiveness", "ক্ষমা"],
            ["patience", "ধৈর্য"],
            ["a hidden blessing", "লুকানো আশীর্বাদ"],
          ],
        },
      },
      {
        en: "Islam is not just a religion; it's a {way} {e}",
        bn: "ইসলাম শুধু একটি ধর্ম নয়; এটি একটি {wayBn} {e}",
        slots: {
          way: [
            ["way of life", "জীবনধারা"],
            ["path to peace", "শান্তির পথ"],
            ["guidance for every step", "প্রতিটি পদক্ষেপের পথনির্দেশ"],
            ["light for the heart", "হৃদয়ের আলো"],
            ["road to jannah", "জান্নাতের রাস্তা"],
            ["refuge for the soul", "আত্মার আশ্রয়"],
          ],
        },
      },
      {
        en: "The best {action} is the one done with {quality} {e}",
        bn: "সবচেয়ে ভালো {actionBn} হলো সেই কাজ, যা {qualityBn} {e}",
        slots: {
          action: [
            ["deed", "আমল"],
            ["prayer", "ইবাদত"],
            ["charity", "দান"],
            ["word", "কথা"],
            ["effort", "প্রচেষ্টা"],
          ],
          quality: [
            ["sincerity", "একনিষ্ঠতা দিয়ে"],
            ["a pure heart", "পবিত্র হৃদয়ে"],
            ["love for Allah", "আল্লাহর ভালোবাসা দিয়ে"],
            ["consistency", "নিয়মিতভাবে"],
            ["humility", "বিনয়ের সাথে"],
          ],
        },
      },
      {
        en: "Have faith in Allah's plan, for His timing is {adj} {e}",
        bn: "আল্লাহর পরিকল্পনায় বিশ্বাস রাখো, কারণ তাঁর সময় {adjBn} {e}",
        slots: {
          adj: [
            ["always perfect", "সবসময় নিখুঁত"],
            ["always fair", "সবসময় ন্যায্য"],
            ["full of wisdom", "হিকমতে ভরা"],
            ["never late", "কখনো দেরি নয়"],
            ["beyond our understanding", "আমাদের বোঝার বাইরে"],
            ["exactly what we need", "ঠিক যা আমাদের দরকার"],
          ],
        },
      },
      {
        en: "A heart filled with {thing} is never truly empty {e}",
        bn: "{thingBn} ভরা হৃদয় কখনো সত্যিই খালি থাকে না {e}",
        slots: {
          thing: [
            ["remembrance of Allah", "আল্লাহর স্মরণে"],
            ["gratitude", "কৃতজ্ঞতায়"],
            ["love for the Prophet", "রাসূলের ভালোবাসায়"],
            ["trust in Allah", "আল্লাহর উপর ভরসায়"],
            ["faith", "ঈমানে"],
            ["hope", "আশায়"],
          ],
        },
      },
      {
        en: "Seek knowledge, for seeking it is {value} {e}",
        bn: "জ্ঞান অন্বেষণ করো, কারণ তা {valueBn} {e}",
        slots: {
          value: [
            ["an act of worship", "একটি ইবাদত"],
            ["a path to paradise", "জান্নাতের পথ"],
            ["a light in the darkness", "অন্ধকারে আলো"],
            ["an obligation", "একটি ফরজ"],
            ["a gift to the soul", "আত্মার উপহার"],
            ["a treasure that never fades", "কখনো নিঃশেষ না হওয়া ধন"],
          ],
        },
      },
      {
        en: "May Allah bless you with {blessing} in {aspect} {e}",
        bn: "আল্লাহ আপনাকে {aspectBn} {blessingBn} দান করুন {e}",
        slots: {
          blessing: [
            ["peace", "শান্তি"],
            ["happiness", "সুখ"],
            ["success", "সফলতা"],
            ["patience", "ধৈর্য"],
            ["barakah", "বরকত"],
            ["guidance", "হেদায়েত"],
            ["strength", "শক্তি"],
            ["forgiveness", "ক্ষমা"],
          ],
          aspect: [
            ["this life", "এই জীবনে"],
            ["your journey", "তোমার যাত্রায়"],
            ["your family", "তোমার পরিবারে"],
            ["your every step", "তোমার প্রতিটি পদক্ষেপে"],
            ["your heart", "তোমার হৃদয়ে"],
            ["your work", "তোমার কাজে"],
            ["your deen", "তোমার দ্বীনে"],
            ["your future", "তোমার ভবিষ্যতে"],
          ],
        },
      },
      {
        en: "Islam teaches us to {action} even when {condition} {e}",
        bn: "ইসলাম আমাদের {actionBn} শেখায়, {conditionBn} {e}",
        slots: {
          action: [
            ["be kind", "দয়ালু হতে"],
            ["give charity", "দান করতে"],
            ["pray", "নামাজ পড়তে"],
            ["forgive", "ক্ষমা করতে"],
            ["stay patient", "ধৈর্য ধরতে"],
            ["speak the truth", "সত্য বলতে"],
            ["help others", "অপরকে সাহায্য করতে"],
            ["be grateful", "কৃতজ্ঞ হতে"],
          ],
          condition: [
            ["times are hard", "যখন সময় কঠিন"],
            ["no one is watching", "যখন কেউ দেখছে না"],
            ["the world is unfair", "যখন পৃথিবী অন্যায়"],
            ["we are tired", "যখন আমরা ক্লান্ত"],
            ["people hurt us", "যখন মানুষ আমাদের কষ্ট দেয়"],
            ["we have little", "যখন আমাদের কাছে অল্প আছে"],
            ["the night is long", "যখন রাত দীর্ঘ"],
            ["everyone else gives up", "যখন সবাই হাল ছেড়ে দেয়"],
          ],
        },
      },
    ],
  },

  funny: {
    emojis: ["😂", "🤣", "😜", "🤪", "🙈", "🍕", "☕", "😅", "🤡", "🙃"],
    statics: [
      ["I'm not lazy, I'm on energy saving mode 😂", "আমি অলস নই, আমি এনার্জি সেভিং মোডে আছি 😂"],
      ["My bed is a magical place where I suddenly remember everything I was supposed to do 😴", "আমার বিছানা এমন এক জাদুর জায়গা, যেখানে হঠাৎ আমার মনে পড়ে যায় সব কিছু যা আমার করা কথা ছিল 😴"],
      ["I put the 'pro' in procrastination 😜", "কাজ পরে করার ব্যাপারে আমি সম্পূর্ণ প্রফেশনাল 😜"],
      ["Diet starts tomorrow. And tomorrow is a very busy day 🍕", "ডায়েট শুরু কাল থেকে। আর কাল তো খুব ব্যস্ত দিন 🍕"],
      ["I'm not arguing, I'm just explaining why I'm right 🤪", "আমি তর্ক করছি না, আমি শুধু ব্যাখ্যা করছি কেন আমি সঠিক 🤪"],
      ["My blood type is coffee-positive ☕", "আমার ব্লাড গ্রুপ হলো কফি-পজিটিভ ☕"],
      ["I would exercise, but it takes too long to recover from it 😅", "আমি ব্যায়াম করতাম, কিন্তু সেটা থেকে রিকভার হতে অনেক সময় লাগে 😅"],
      ["Some people graduate with honors. I graduated with naps 🎓", "কেউ কেউ অনার্স নিয়ে গ্র্যাজুয়েট হয়। আমি ন্যাপ নিয়ে গ্র্যাজুয়েট হয়েছি 🎓"],
      ["My fitness goal is a pizza in one hand and a remote in the other 🍕", "আমার ফিটনেস লক্ষ্য হলো এক হাতে পিৎজা আর অন্য হাতে রিমোট 😂"],
      ["I'm on a seafood diet. I see food and I eat it 🙈", "আমি সীফুড ডায়েটে আছি। খাবার দেখলেই খেয়ে ফেলি 🙈"],
      ["Sarcasm is my love language 🙃", "বিদ্রুপই আমার ভালোবাসার ভাষা 🙃"],
      ["I finally got my life together. Then it fell asleep again 😴", "অবশেষে জীবনটা গুছিয়ে নিলাম। তারপর আবার ঘুমিয়ে পড়ল 😴"],
    ],
    groups: [
      {
        en: "I speak fluent {language} {e}",
        bn: "আমি সাবলীল {languageBn} বলি {e}",
        slots: {
          language: [
            ["procrastination", "কাজ-পরে-করার ভাষা"],
            ["sarcasm", "বিদ্রুপের ভাষা"],
            ["snack-ese", "স্ন্যাকের ভাষা"],
            ["napping", "ঘুমের ভাষা"],
            ["coffee", "কফির ভাষা"],
            ["overthinking", "অতিরিক্ত ভাবনার ভাষা"],
            ["Monday-ese", "সোমবারের ভাষা"],
            ["text-lingo", "টেক্সটের ভাষা"],
          ],
        },
      },
      {
        en: "My bed and I have a {relationship} {e}",
        bn: "আমার বিছানার সাথে আমার {relationshipBn} {e}",
        slots: {
          relationship: [
            ["complicated relationship", "জটিল সম্পর্ক"],
            ["long-distance relationship", "দূরত্বের সম্পর্ক"],
            ["beautiful love story", "সুন্দর প্রেমের গল্প"],
            ["no-drama relationship", "নাটকহীন সম্পর্ক"],
            ["toxic relationship", "বিষাক্ত সম্পর্ক"],
            ["true love story", "সত্যিকারের প্রেমের গল্প"],
          ],
        },
      },
      {
        en: "I'm professionally {skill} {e}",
        bn: "আমি প্রফেশনালভাবে {skillBn} {e}",
        slots: {
          skill: [
            ["good at napping", "ঘুমানোতে পারদর্শী"],
            ["good at avoiding responsibilities", "দায়িত্ব এড়ানোতে পারদর্শী"],
            ["good at overthinking", "অতিরিক্ত ভাবতে পারদর্শী"],
            ["good at eating snacks", "স্ন্যাক খাওয়ায় পারদর্শী"],
            ["good at losing things", "জিনিস হারানোতে পারদর্শী"],
            ["good at being late", "দেরি করায় পারদর্শী"],
            ["good at ignoring alarms", "অ্যালার্ম উপেক্ষায় পারদর্শী"],
          ],
        },
      },
      {
        en: "My brain has {feature} {e}",
        bn: "আমার ব্রেইনে {featureBn} {e}",
        slots: {
          feature: [
            ["5% battery all the time", "সবসময় ৫% ব্যাটারি"],
            ["random buffering", "এলোমেলো লোডিং"],
            ["a skip button for alarms", "অ্যালার্ম স্কিপ করার বাটন"],
            ["a search bar with no results", "কোনো ফলাফলহীন সার্চ বার"],
            ["automatic sleep mode", "অটোমেটিক স্লিপ মোড"],
            ["freezer mode in winter", "শীতে ফ্রিজার মোড"],
            ["no delete option for cringe memories", "অস্বস্তিকর স্মৃতি ডিলিটের কোনো অপশন নেই"],
          ],
        },
      },
      {
        en: "I don't need a {thing} to be happy {e}",
        bn: "সুখী হতে আমার {thingBn} দরকার নেই {e}",
        slots: {
          thing: [
            ["reason", "কারণ"],
            ["alarm clock", "অ্যালার্ম ঘড়ি"],
            ["plan", "পরিকল্পনা"],
            ["recipe", "রেসিপি"],
            ["gym membership", "জিম মেম্বারশিপ"],
            ["adulting skills", "এডাল্টিং স্কিল"],
          ],
        },
      },
      {
        en: "Warning: {warning} {e}",
        bn: "সতর্কবার্তা: {warningBn} {e}",
        slots: {
          warning: [
            ["I run on coffee and chaos", "আমি কফি আর বিশৃঙ্খলায় চলে"],
            ["I may laugh at random times", "হঠাৎ হঠাৎ আমার হাসি পেতে পারে"],
            ["my humor is an acquired taste", "আমার রসবোধ অর্জিত রুচি"],
            ["hugging me might make you smile", "আমাকে জড়িয়ে ধরলে তোমার হাসি পেতে পারে"],
            ["I tell dad jokes", "আমি বাবা-ধরনের জোক বলি"],
            ["I'm dangerously funny", "আমি বিপজ্জনকভাবে মজার"],
          ],
        },
      },
      {
        en: "If {situation}, {result} {e}",
        bn: "{situationBn} হলে, {resultBn} {e}",
        slots: {
          situation: [
            ["Monday had a face", "সোমবারের একটা মুখ থাকত"],
            ["calories didn't exist", "ক্যালরি বলে কিছু না থাকত"],
            ["sleeping was a sport", "ঘুম একটা খেলা হতো"],
            ["WiFi was free everywhere", "সব জায়গায় ওয়াইফাই ফ্রি থাকত"],
            ["chocolate was a vegetable", "চকলেট সবজি হতো"],
            ["weekends lasted longer", "উইকেন্ড আরও লম্বা হতো"],
          ],
          result: [
            ["I'd fight it", "আমি লড়াই করতাম"],
            ["I'd be a champion", "আমি চ্যাম্পিয়ন হতাম"],
            ["I'd win a gold medal", "আমি সোনার মেডেল পেতাম"],
            ["the world would be perfect", "পৃথিবীটা নিখুঁত হতো"],
            ["I'd never complain", "আমি কখনো অভিযোগ করতাম না"],
            ["I'd smile more", "আমি আরও হাসতাম"],
          ],
        },
      },
      {
        en: "My favorite exercise is {exercise} {e}",
        bn: "আমার প্রিয় ব্যায়াম হলো {exerciseBn} {e}",
        slots: {
          exercise: [
            ["running late", "সবসময় দেরি করা"],
            ["jumping to conclusions", "তাড়াহুড়ো করে সিদ্ধান্ত নেওয়া"],
            ["stretching the truth", "সত্যকে টানানো"],
            ["bench-pressing the snooze button", "স্নুজ বাটন চাপা"],
            ["lifting snacks to my mouth", "স্ন্যাক মুখে তোলা"],
            ["dodging responsibilities", "দায়িত্ব এড়ানো"],
          ],
        },
      },
      {
        en: "I'm in shape. {shape} is a shape, right? {e}",
        bn: "আমি শেপে আছি। {shapeBn}ও তো একটা শেপ! {e}",
        slots: {
          shape: [
            ["Round", "গোল"],
            ["Oval", "ডিম্বাকৃতি"],
            ["Circle", "বৃত্ত"],
            ["Pillow", "বালিশ"],
            ["Couch potato", "কাউচ আলু"],
            ["Soft ball", "নরম বল"],
          ],
        },
      },
      {
        en: "My plans for the weekend: {plan} {e}",
        bn: "উইকেন্ডের আমার প্ল্যান: {planBn} {e}",
        slots: {
          plan: [
            ["nap, repeat", "ঘুম, আবার ঘুম"],
            ["nothing, absolutely nothing", "কিছুই না, একদম কিছুই না"],
            ["avoid all humans", "সব মানুষ এড়ানো"],
            ["eat and sleep", "খাওয়া আর ঘুম"],
            ["pretend to be productive", "উৎপাদনশীল সাজার অভিনয়"],
            ["recover from the week", "সপ্তাহ থেকে রিকভার করা"],
          ],
        },
      },
      {
        en: "My favorite {activity} is {action} {e}",
        bn: "আমার প্রিয় {activityBn} হলো {actionBn} {e}",
        slots: {
          activity: [
            ["hobby", "শখ"],
            ["sport", "খেলা"],
            ["exercise", "ব্যায়াম"],
            ["pastime", "মজা"],
            ["workout", "ওয়ার্কআউট"],
            ["morning routine", "সকালের রুটিন"],
            ["weekend activity", "উইকেন্ডের কাজ"],
            ["study method", "পড়ার পদ্ধতি"],
          ],
          action: [
            ["finding my keys in the last place I look", "সবশেষ জায়গায় চাবি খুঁজে পাওয়া"],
            ["pretending I didn't see the message", "মেসেজ না দেখা ভান করা"],
            ["snoozing the alarm", "অ্যালার্ম স্নুজ করা"],
            ["ordering food when I have food", "খাবার থাকতে অর্ডার করা"],
            ["making plans I'll cancel", "ক্যানসেল করব এমন প্ল্যান করা"],
            ["saying '5 more minutes' for an hour", "এক ঘণ্টা ধরে 'আর ৫ মিনিট' বলা"],
            ["searching for my phone while holding it", "হাতে ফোন নিয়েই ফোন খোঁজা"],
            ["reorganizing my junk drawer", "জাঙ্ক ড্রয়ার সাজানো"],
          ],
        },
      },
      {
        en: "I tried being {adj}, but {result} {e}",
        bn: "আমি {adjBn} হওয়ার চেষ্টা করেছিলাম, কিন্তু {resultBn} {e}",
        slots: {
          adj: [
            ["adult", "বড়"],
            ["serious", "গম্ভীর"],
            ["productive", "উৎপাদনশীল"],
            ["organized", "গোছালো"],
            ["on time", "সময়মতো"],
            ["healthy", "স্বাস্থ্যকর"],
            ["focused", "মনোযোগী"],
            ["responsible", "দায়িত্বশীল"],
          ],
          result: [
            ["the couch called me", "কাউচ আমাকে ডেকে নিল"],
            ["my bed won", "আমার বিছানা জিতে গেল"],
            ["snacks happened", "স্ন্যাক খাওয়া হয়ে গেল"],
            ["I fell asleep", "আমি ঘুমিয়ে পড়লাম"],
            ["Monday got me", "সোমবার আমাকে ধরল"],
            ["my phone distracted me", "ফোন আমাকে ব্যস্ত করে দিল"],
            ["the alarm betrayed me", "অ্যালার্ম বিশ্বাসঘাতকতা করল"],
            ["the plan failed spectacularly", "প্ল্যানটা দারুণভাবে ব্যর্থ হলো"],
          ],
        },
      },
    ],
  },

  life: {
    emojis: ["🌱", "✨", "☀️", "🍂", "🌊", "🧭", "🌻", "🎈", "💫", "🏞️"],
    statics: [
      ["Life is what happens when you're busy making other plans 🍃", "অন্য পরিকল্পনা করতে ব্যস্ত থাকলে জীবন নিজের মতো করে ঘটে যায় 🍃"],
      ["The secret of life is not to do what you like, but to like what you do 🌱", "জীবনের রহস্য হলো তুমি যা ভালোবাসো তা করা নয়, বরং যা করো তা ভালোবাসা 🌱"],
      ["Life is 10% what happens to you and 90% how you react to it 🎯", "জীবনের ১০% হলো যা তোমার সাথে ঘটে, আর ৯০% হলো তুমি তাতে কীভাবে সাড়া দাও 🎯"],
      ["Every day is a second chance. That is why we call it 'today' ✨", "প্রতিটি দিনই এক নতুন সুযোগ। তাই তো একে বলে 'আজ' ✨"],
      ["Life isn't about waiting for the storm to pass; it's about learning to dance in the rain 🌧️", "জীবন ঝড় থেমে যাওয়ার অপেক্ষা করার নাম নয়, বৃষ্টিতে নাচতে শেখার নাম 🌧️"],
      ["You can't start the next chapter of your life if you keep re-reading the last one 📖", "আগের অধ্যায় বারবার পড়ে থাকলে জীবনের নতুন অধ্যায় শুরু করা যায় না 📖"],
      ["Life is a journey, not a destination 🧭", "জীবন হলো এক যাত্রা, কোনো গন্তব্য নয় 🧭"],
      ["The best way to predict the future is to create it 🎨", "ভবিষ্যৎ অনুমান করার সবচেয়ে ভালো উপায় হলো সেটা তৈরি করা 🎨"],
      ["In the end, we only regret the chances we didn't take 🎈", "শেষ পর্যন্ত আমরা শুধু সেগুলোর জন্যই আফসোস করি, যে সুযোগগুলো নিইনি 🎈"],
      ["Be the reason someone believes in goodness today 🌻", "আজ এমন কারণ হয়ে দাঁড়াও, যাতে কেউ কল্যাণে বিশ্বাস করে 🌻"],
      ["Life is a mirror: what you give is what you get 🌊", "জীবন হলো আয়না: যা দেবে তাই পাবে 🌊"],
      ["Take the risk or lose the chance 💫", "ঝুঁকি নাও, নয়তো সুযোগ হারাবে 💫"],
    ],
    groups: [
      {
        en: "Life is {phrase} {e}",
        bn: "জীবন হলো {phraseBn} {e}",
        slots: {
          phrase: [
            ["an echo — what you send comes back", "প্রতিধ্বনি — যা পাঠাও তা ফিরে আসে"],
            ["a book with empty pages", "অলেখা পাতার এক বই"],
            ["a garden you must water", "সেচ দিতে হয় এমন এক বাগান"],
            ["a marathon, not a sprint", "স্প্রিন্ট নয়, এক ম্যারাথন"],
            ["a candle that must burn brightly", "উজ্জ্বলভাবে জ্বলতে থাকা এক মোমবাতি"],
            ["a river that never stops flowing", "কখনো থেমে না যাওয়া এক নদী"],
            ["a canvas waiting for your colors", "তোমার রঙের অপেক্ষায় এক ক্যানভাস"],
            ["a classroom with daily lessons", "প্রতিদিনের পাঠ নিয়ে এক ক্লাসরুম"],
          ],
        },
      },
      {
        en: "Life isn't about waiting for the storm to pass; it's about learning to {do} in the rain {e}",
        bn: "জীবন ঝড় থেমে যাওয়ার অপেক্ষা করার নাম নয়, বৃষ্টিতে {doBn} শেখার নাম {e}",
        slots: {
          do: [
            ["dance", "নাচার"],
            ["smile", "হাসার"],
            ["walk", "হাঁটার"],
            ["grow", "বেড়ে ওঠার"],
            ["sing", "গান গাওয়ার"],
            ["stay grateful", "কৃতজ্ঞ থাকার"],
          ],
        },
      },
      {
        en: "Every day is a {gift}; that's why it's called the present {e}",
        bn: "প্রতিটি দিন এক উপহার; তাই তো একে বর্তমান বলা হয় {e}",
        slots: {
          gift: [
            ["gift", "উপহার"],
            ["blessing", "আশীর্বাদ"],
            ["new beginning", "নতুন শুরু"],
            ["blank canvas", "খালি ক্যানভাস"],
            ["fresh page", "নতুন পাতা"],
            ["golden opportunity", "সোনালি সুযোগ"],
          ],
        },
      },
      {
        en: "The best thing about {thing} is the people you {do} with {e}",
        bn: "{thingBn} এর সবচেয়ে ভালো দিক হলো, যাদের সাথে তুমি {doBn} {e}",
        slots: {
          thing: [
            ["life", "জীবনের"],
            ["any journey", "যেকোনো যাত্রার"],
            ["success", "সাফল্যের"],
            ["every moment", "প্রতিটি মুহূর্তের"],
          ],
          do: [
            ["share it", "ভাগ করে নাও"],
            ["celebrate", "উদযাপন করো"],
            ["walk", "হেঁটে চলো"],
            ["laugh", "হাসো"],
            ["grow", "বেড়ে ওঠো"],
            ["create memories", "স্মৃতি তৈরি করো"],
          ],
        },
      },
      {
        en: "Life gives you {thing} to help you grow {e}",
        bn: "জীবন তোমাকে {thingBn} দেয়, যাতে তুমি বেড়ে উঠতে পারো {e}",
        slots: {
          thing: [
            ["storms", "ঝড়"],
            ["seasons", "ঋতু"],
            ["challenges", "চ্যালেঞ্জ"],
            ["lessons", "পাঠ"],
            ["detours", "ঘুরপথ"],
            ["silent nights", "নীরব রাত"],
            ["new mornings", "নতুন সকাল"],
            ["unexpected turns", "অপ্রত্যাশিত মোড়"],
          ],
        },
      },
      {
        en: "Don't count the {counted}, count the {count} {e}",
        bn: "{countedBn} গোনা বাদ দাও, {countBn} গুনো {e}",
        slots: {
          counted: [
            ["days", "দিনগুলো"],
            ["problems", "সমস্যাগুলো"],
            ["tears", "অশ্রুগুলো"],
            ["hours", "ঘণ্টাগুলো"],
            ["fears", "ভয়গুলো"],
            ["losses", "ক্ষতিগুলো"],
          ],
          count: [
            ["moments", "মুহূর্তগুলো"],
            ["blessings", "নেয়ামতগুলো"],
            ["smiles", "হাসিগুলো"],
            ["memories", "স্মৃতিগুলো"],
            ["friends", "বন্ধুদের"],
            ["reasons to be happy", "সুখী থাকার কারণগুলো"],
          ],
        },
      },
      {
        en: "Life is short. {do} what matters {e}",
        bn: "জীবন ছোট। যা গুরুত্বপূর্ণ তা {doBn} {e}",
        slots: {
          do: [
            ["do", "করো"],
            ["love", "ভালোবাসো"],
            ["chase", "ধাওয়া করো"],
            ["share", "ভাগ করে নাও"],
            ["enjoy", "উপভোগ করো"],
            ["forgive", "ক্ষমা করো"],
            ["dream", "স্বপ্ন দেখো"],
            ["spend wisely", "সঠিকভাবে খরচ করো"],
          ],
        },
      },
      {
        en: "Sometimes the {path} makes the man {e}",
        bn: "কখনো কখনো {pathBn}ই মানুষকে গড়ে তোলে {e}",
        slots: {
          path: [
            ["detour", "ঘুরপথ"],
            ["struggle", "সংগ্রাম"],
            ["silence", "নীরবতা"],
            ["mistake", "ভুল"],
            ["long journey", "দীর্ঘ যাত্রা"],
            ["quiet valley", "নীরব উপত্যকা"],
            ["stormy sea", "ঝড়ো সমুদ্র"],
            ["steep hill", "খাড়া পাহাড়"],
          ],
        },
      },
      {
        en: "Wherever you go, go with all your {heart} {e}",
        bn: "যেখানেই যাও, {heartBn} নিয়ে যাও {e}",
        slots: {
          heart: [
            ["heart", "সব মন"],
            ["passion", "সব উদ্যম"],
            ["kindness", "সব দয়া"],
            ["dreams", "সব স্বপ্ন"],
            ["courage", "সব সাহস"],
            ["hope", "সব আশা"],
          ],
        },
      },
      {
        en: "The {element} you choose today shapes your tomorrow {e}",
        bn: "আজ তুমি যে {elementBn} বেছে নাও, তা-ই গড়ে তোলে তোমার আগামীকাল {e}",
        slots: {
          element: [
            ["path", "পথ"],
            ["habit", "অভ্যাস"],
            ["thought", "ভাবনা"],
            ["friend", "বন্ধু"],
            ["word", "কথা"],
            ["dream", "স্বপ্ন"],
            ["attitude", "মনোভাব"],
            ["book", "বই"],
          ],
        },
      },
      {
        en: "Happiness grows when {thing} {e}",
        bn: "সুখ বেড়ে যায় যখন {thingBn} {e}",
        slots: {
          thing: [
            ["you share what you have", "তুমি যা আছে তা ভাগ করে নাও"],
            ["you forgive someone", "তুমি কাউকে ক্ষমা করো"],
            ["you count your blessings", "তুমি নেয়ামতগুলো গুনো"],
            ["you help a stranger", "তুমি একজন অপরিচিতকে সাহায্য করো"],
            ["you call your mother", "তুমি মাকে ফোন করো"],
            ["you chase your dream", "তুমি স্বপ্নের পেছনে ছুটো"],
            ["you rest without guilt", "তুমি অপরাধবোধ ছাড়া বিশ্রাম নাও"],
            ["you notice the small joys", "তুমি ছোট আনন্দগুলো খেয়াল করো"],
          ],
        },
      },
      {
        en: "The journey of life teaches {lesson} at every {stage} {e}",
        bn: "জীবনের যাত্রা প্রতিটি {stageBn} {lessonBn} শেখায় {e}",
        slots: {
          lesson: [
            ["patience", "ধৈর্য"],
            ["gratitude", "কৃতজ্ঞতা"],
            ["courage", "সাহস"],
            ["humility", "নম্রতা"],
            ["forgiveness", "ক্ষমা"],
            ["hope", "আশা"],
            ["wisdom", "জ্ঞান"],
            ["love", "ভালোবাসা"],
          ],
          stage: [
            ["turning point", "মোড়ে"],
            ["sunrise", "সূর্যোদয়ে"],
            ["crossroad", "চৌরাস্তায়"],
            ["storm", "ঝড়ে"],
            ["quiet season", "নীরব ঋতুতে"],
            ["new beginning", "নতুন শুরুতে"],
            ["difficult path", "কঠিন পথে"],
            ["blessed moment", "আশীর্বাদপূর্ণ মুহূর্তে"],
          ],
        },
      },
    ],
  },
  attitude: {
    emojis: ["😎", "🔥", "💪", "😏", "👑", "⚡", "🧊", "🎯", "🙌", "🕶️"],
    statics: [
      ["I am not arrogant; I am just confident about my choices 😎", "আমি অহংকারী নই; আমি শুধু নিজের সিদ্ধান্ত নিয়ে আত্মবিশ্বাসী 😎"],
      ["My silence is not weakness; it is my way of staying classy 🧊", "আমার নীরবতা দুর্বলতা নয়; এটা শালীনতা রক্ষার আমার নিজস্ব উপায় 🧊"],
      ["Respect yourself enough to walk away from anything that no longer serves you 👑", "যে জিনিস আর আপনার উপকারে আসে না, তা থেকে বেরিয়ে আসার মতো নিজেকে সম্মান করুন 👑"],
      ["I do not compete with anyone; I complete my own goals 🔥", "আমি কারো সাথে প্রতিযোগিতা করি না; আমি নিজের লক্ষ্য পূরণ করি 🔥"],
      ["Some people act like they know me; let them dream 😏", "কিছু মানুষ মনে করে তারা আমাকে চেনে; তাদের স্বপ্ন দেখতে দিন 😏"],
      ["My standards are my superpower, not my weakness 💪", "আমার মানদণ্ডই আমার শক্তি, দুর্বলতা নয় 💪"],
      ["Be yourself; everyone else is already taken 😎", "নিজের মতো থাকুন; বাকিরা সবাই ইতিমধ্যে অন্য কেউ হয়ে আছে 😎"],
      ["I do not chase attention; attention follows value ⚡", "আমি মনোযোগের পেছনে ছুটিই না; মনোযোগ আসে মূল্যের পেছনে ⚡"],
      ["Discipline beats motivation every single time 🎯", "প্রতিবারই অনুপ্রেরণার চেয়ে শৃঙ্খলা এগিয়ে থাকে 🎯"],
      ["Your opinion of me is not my reality 👑", "আমার সম্পর্কে আপনার মতামত আমার বাস্তবতা নয় 👑"],
      ["I owe you an explanation only if I owe you something 🔥", "আমি শুধু তখনই ব্যাখ্যা দেব, যখন আপনার কাছে আমার ঋণ থাকবে 🔥"],
      ["Walk like you own the room, even when you do not 🙌", "ঘরে ঢুকুন যেন পুরো ঘর আপনার, এমন ভঙ্গিতে — সেটা না হলেও 🙌"],
    ],
    groups: [
      {
        en: "My {asset} is my {quality}, not my {weakness} {e}",
        bn: "আমার {assetBn} হলো আমার {qualityBn}, {weaknessBn} নয় {e}",
        slots: {
          asset: [
            ["self-respect", "আত্মসম্মান"],
            ["confidence", "আত্মবিশ্বাস"],
            ["honesty", "সততা"],
            ["discipline", "শৃঙ্খলা"],
            ["patience", "ধৈর্য"],
            ["focus", "একাগ্রতা"],
            ["silence", "নীরবতা"],
            ["courage", "সাহস"],
          ],
          quality: [
            ["superpower", "সুপারপাওয়ার"],
            ["armor", "বর্ম"],
            ["weapon", "অস্ত্র"],
            ["crown", "মুকুট"],
            ["fuel", "জ্বালানি"],
            ["shield", "ঢাল"],
            ["identity", "পরিচয়"],
            ["strength", "শক্তি"],
          ],
          weakness: [
            ["weakness", "দুর্বলতা"],
            ["burden", "বোঝা"],
            ["flaw", "ত্রুটি"],
            ["mistake", "ভুল"],
            ["excuse", "অজুহাত"],
            ["curse", "অভিশাপ"],
          ],
        },
      },
      {
        en: "I {verb} my {thing} — nobody else does {e}",
        bn: "আমার {thingBn} নিয়ন্ত্রণ আমার হাতে — অন্য কারো নয় {e}",
        slots: {
          verb: [
            ["control", "নিয়ন্ত্রণ করি"],
            ["own", "মালিক"],
            ["lead", "নেতৃত্ব দিই"],
            ["decide", "সিদ্ধান্ত নিই"],
            ["shape", "গড়ি"],
            ["master", "দখলে রাখি"],
            ["define", "নির্ধারণ করি"],
            ["choose", "বেছে নিই"],
          ],
          thing: [
            ["life", "জীবনের"],
            ["mind", "মনের"],
            ["time", "সময়ের"],
            ["path", "পথের"],
            ["rules", "নিয়মের"],
            ["game", "খেলার"],
            ["destiny", "ভাগ্যের"],
            ["vibes", "মুডের"],
          ],
        },
      },
      {
        en: "While they {talk}, I {work} {e}",
        bn: "ওরা যখন {talkBn}, আমি তখন {workBn} {e}",
        slots: {
          talk: [
            ["talk", "কথা বলে"],
            ["sleep", "ঘুমায়"],
            ["wait", "অপেক্ষা করে"],
            ["doubt", "সন্দেহ করে"],
            ["criticize", "সমালোচনা করে"],
            ["waste time", "সময় নষ্ট করে"],
            ["show off", "দেখিয়ে বেড়ায়"],
            ["hesitate", "আমতা-ওমতা করে"],
          ],
          work: [
            ["grind", "পরিশ্রম করি"],
            ["build", "গড়ে তুলি"],
            ["grow", "বেড়ে উঠি"],
            ["glow", "উজ্জ্বল হই"],
            ["hustle", "কঠোর পরিশ্রম করি"],
            ["win", "জিতি"],
            ["improve", "উন্নতি করি"],
            ["shine", "ঝলমল করি"],
          ],
        },
      },
      {
        en: "I {ignore} the {noise} and {focus} on my {goal} {e}",
        bn: "আমি {noiseBn} {ignoreBn} এবং {goalBn} দিকে {focusBn} {e}",
        slots: {
          ignore: [
            ["ignore", "উপেক্ষা করি"],
            ["block", "আটকে দিই"],
            ["skip", "বাদ দিই"],
            ["dismiss", "তাড়িয়ে দিই"],
          ],
          noise: [
            ["hate", "ঘৃণা"],
            ["drama", "নাটক"],
            ["rumors", "গুজব"],
            ["negativity", "নেতিবাচকতা"],
            ["jealousy", "হিংসা"],
            ["criticism", "সমালোচনা"],
            ["distractions", "বিভ্রান্তি"],
            ["noise", "কোলাহল"],
          ],
          goal: [
            ["dream", "স্বপ্নের"],
            ["vision", "দর্শনের"],
            ["mission", "মিশনের"],
            ["purpose", "লক্ষ্যের"],
          ],
          focus: [
            ["focus", "মনোযোগ দিই"],
            ["stay focused", "একাগ্র থাকি"],
            ["stay locked", "আটকে থাকি"],
            ["fix my eyes", "দৃষ্টি রাখি"],
          ],
        },
      },
      {
        en: "I would rather be {a} than {b} {e}",
        bn: "{bBn} হওয়ার চেয়ে আমি {aBn} হতে পছন্দ করি {e}",
        slots: {
          a: [
            ["honest", "সৎ"],
            ["alone", "একা"],
            ["real", "খাঁটি"],
            ["myself", "নিজেকে"],
            ["focused", "একাগ্র"],
            ["patient", "ধৈর্যশীল"],
            ["loyal", "অনুগত"],
            ["quiet", "নীরব"],
          ],
          b: [
            ["fake", "ভণ্ড"],
            ["lost", "হারা"],
            ["a copy", "নকল"],
            ["a pretender", "ভানকারী"],
            ["restless", "অস্থির"],
            ["a follower", "অনুসারী"],
            ["two-faced", "দুমুখো"],
            ["loud", "উচ্চকণ্ঠ"],
          ],
        },
      },
      {
        en: "My {line} is simple: {principle} {e}",
        bn: "আমার {lineBn} সহজ: {principleBn} {e}",
        slots: {
          line: [
            ["philosophy", "দর্শন"],
            ["rule", "নিয়ম"],
            ["motto", "নীতিবাক্য"],
            ["code", "নীতি"],
            ["mindset", "মানসিকতা"],
            ["vibe", "শৈলী"],
          ],
          principle: [
            ["respect or ignore", "সম্মান নাহয় উপেক্ষা"],
            ["action over words", "কথার চেয়ে কাজ"],
            ["class is permanent", "শালীনতা চিরন্তন"],
            ["stay true", "সত্য থাকো"],
            ["no shortcuts", "শর্টকাট নয়"],
            ["keep moving", "এগিয়ে চলো"],
          ],
        },
      },
      {
        en: "I {wear} my {quality} like a {accessory} {e}",
        bn: "আমি আমার {qualityBn} {accessoryBn}-এর মতো {wearBn} {e}",
        slots: {
          wear: [
            ["carry", "ধারণ করি"],
            ["wear", "পরে থাকি"],
            ["flaunt", "দেখাই"],
            ["own", "মালিকানায় রাখি"],
          ],
          quality: [
            ["confidence", "আত্মবিশ্বাস"],
            ["honesty", "সততা"],
            ["style", "শৈলী"],
            ["attitude", "অ্যাটিটিউড"],
            ["grace", "মাধুর্য"],
            ["strength", "শক্তি"],
          ],
          accessory: [
            ["crown", "মুকুট"],
            ["armor", "বর্ম"],
            ["ring", "আংটি"],
            ["shade", "ছায়া"],
            ["badge", "ব্যাজ"],
            ["cape", "কেপ"],
          ],
        },
      },
      {
        en: "Not my {problem}? Not my {reaction} {e}",
        bn: "আমার {problemBn} নয়? তাহলে আমার {reactionBn}-ও নয় {e}",
        slots: {
          problem: [
            ["business", "ব্যাপার"],
            ["drama", "নাটক"],
            ["gossip", "গসিপ"],
            ["chaos", "হৈচৈ"],
            ["noise", "কোলাহল"],
            ["mess", "ঝামেলা"],
          ],
          reaction: [
            ["attention", "মনোযোগ"],
            ["energy", "শক্তি"],
            ["time", "সময়"],
            ["response", "প্রতিক্রিয়া"],
            ["interest", "আগ্রহ"],
            ["space", "জায়গা"],
          ],
        },
      },
      {
        en: "They wait for me to {fall}, but I keep {rising} {e}",
        bn: "ওরা আমার {fallBn} অপেক্ষা করে, কিন্তু আমি {risingBn} থাকি {e}",
        slots: {
          fall: [
            ["fall", "পতনের"],
            ["fail", "ব্যর্থতার"],
            ["break", "ভেঙে পড়ার"],
            ["quit", "হাল ছাড়ার"],
          ],
          rising: [
            ["rising", "উঠে দাঁড়ানো"],
            ["winning", "জেতা"],
            ["growing", "বড় হওয়া"],
            ["glowing", "উজ্জ্বল হওয়া"],
          ],
        },
      },
      {
        en: "I {move} at my own {pace}; {catch} if you can {e}",
        bn: "আমি নিজের {paceBn} {moveBn}; পারলে {catchBn} {e}",
        slots: {
          move: [
            ["move", "চলি"],
            ["live", "বাঁচি"],
            ["work", "কাজ করি"],
            ["walk", "হাঁটি"],
          ],
          pace: [
            ["pace", "গতিতে"],
            ["rhythm", "ছন্দে"],
            ["speed", "গতিতে"],
            ["time", "সময়ে"],
          ],
          catch: [
            ["catch up", "পিছু ধরুন"],
            ["follow", "অনুসরণ করুন"],
            ["keep up", "তাল মিলান"],
            ["match", "মিলিয়ে চলুন"],
          ],
        },
      },
    ],
  },
  success: {
    emojis: ["🚀", "💪", "🔥", "🏆", "🎯", "📈", "🌟", "💎", "⚡", "🌄"],
    statics: [
      ["Success is not final, failure is not fatal — it is the courage to continue 🚀", "সাফল্য চূড়ান্ত নয়, ব্যর্থতা মারাত্মকও নয় — এটা হলো চালিয়ে যাওয়ার সাহস 🚀"],
      ["Dream big, work hard, stay humble, repeat 🌟", "বড় স্বপ্ন দেখুন, কঠোর পরিশ্রম করুন, নম্র থাকুন, আর বারবার করুন 🌟"],
      ["Your hustle today is your trophy tomorrow 🏆", "আজকের পরিশ্রমই আগামীকালের ট্রফি 🏆"],
      ["Success is the sum of small efforts repeated every day 📈", "সাফল্য হলো প্রতিদিন পুনরাবৃত্ত ছোট ছোট প্রচেষ্টার যোগফল 📈"],
      ["Fall seven times, stand up eight 💪", "সাতবার পড়ুন, আটবার উঠে দাঁড়ান 💪"],
      ["Discipline is choosing between what you want now and what you want most 🎯", "শৃঙ্খলা হলো এখন যা চান আর সবচেয়ে বেশি যা চান, তার মধ্যে বেছে নেওয়া 🎯"],
      ["The best time to plant a tree was 20 years ago; the second best time is now 🌄", "গাছ লাগানোর সেরা সময় ছিল ২০ বছর আগে; দ্বিতীয় সেরা সময় হলো এখন 🌄"],
      ["Stop counting the hours; count the results ⚡", "ঘণ্টা গণনা করা বন্ধ করুন; ফলাফল গণনা করুন ⚡"],
      ["Every expert was once a beginner 🚀", "প্রতিটি বিশেষজ্ঞ একসময় ছিলেন একজন শিক্ষানবিশ 🚀"],
      ["Small steps every day lead to big changes 🔥", "প্রতিদিনের ছোট ছোট পদক্ষেপই বড় পরিবর্তন আনে 🔥"],
      ["Don't watch the clock; do what it does — keep going 🎯", "ঘড়ির দিকে তাকাবেন না; ঘড়ি যা করে তা করুন — চলতে থাকুন 🎯"],
      ["Success speaks for itself; let your results do the talking 💎", "সাফল্য নিজেই কথা বলে; আপনার ফলাফলকেই কথা বলতে দিন 💎"],
    ],
    groups: [
      {
        en: "I {wake} with {purpose} and {sleep} with {satisfaction} {e}",
        bn: "আমি {purposeBn} নিয়ে {wakeBn} এবং {satisfactionBn} নিয়ে {sleepBn} {e}",
        slots: {
          wake: [
            ["wake up", "জেগে উঠি"],
            ["start the day", "দিন শুরু করি"],
            ["rise", "উঠি"],
            ["begin", "শুরু করি"],
          ],
          purpose: [
            ["a goal", "লক্ষ্য"],
            ["a plan", "পরিকল্পনা"],
            ["a dream", "স্বপ্ন"],
            ["a mission", "মিশন"],
            ["focus", "একাগ্রতা"],
            ["a vision", "দর্শন"],
          ],
          sleep: [
            ["sleep", "ঘুমাই"],
            ["rest", "বিশ্রাম নিই"],
            ["close the day", "দিন শেষ করি"],
            ["finish", "শেষ করি"],
          ],
          satisfaction: [
            ["pride", "গর্ব"],
            ["peace", "শান্তি"],
            ["gratitude", "কৃতজ্ঞতা"],
            ["confidence", "আত্মবিশ্বাস"],
            ["joy", "আনন্দ"],
            ["a clear mind", "নির্মল মন"],
          ],
        },
      },
      {
        en: "Hustle {time} because {reason} {e}",
        bn: "{reasonBn} তাই {timeBn} কঠোর পরিশ্রম করুন {e}",
        slots: {
          time: [
            ["every day", "প্রতিদিন"],
            ["every night", "প্রতিরাতে"],
            ["before sunrise", "সূর্যোদয়ের আগে"],
            ["when others rest", "অন্যদের বিশ্রামের সময়"],
            ["in silence", "নীরবে"],
            ["without excuses", "অজুহাত ছাড়া"],
          ],
          reason: [
            ["dreams do not wait", "স্বপ্ন অপেক্ষা করে না"],
            ["success is earned", "সাফল্য অর্জন করতে হয়"],
            ["your future self is watching", "আপনার ভবিষ্যৎ নিজেই দেখছে"],
            ["luck favors the prepared", "ভাগ্য প্রস্তুতদের পাশে থাকে"],
            ["you deserve it", "আপনি এটা পাওয়ার যোগ্য"],
          ],
        },
      },
      {
        en: "Great things never come from {place}; they come from {source} {e}",
        bn: "বড় কিছু কখনো {placeBn} থেকে আসে না; আসে {sourceBn} থেকে {e}",
        slots: {
          place: [
            ["comfort zones", "আরামের জায়গা"],
            ["waiting rooms", "অপেক্ষার ঘর"],
            ["excuses", "অজুহাতের খাতা"],
            ["wishful thinking", "খেয়ালি চিন্তা"],
          ],
          source: [
            ["hard work", "কঠোর পরিশ্রম"],
            ["consistency", "অবিচলতা"],
            ["courage", "সাহস"],
            ["sacrifice", "ত্যাগ"],
            ["patience", "ধৈর্য"],
            ["discipline", "শৃঙ্খলা"],
          ],
        },
      },
      {
        en: "Your {action} today decides your {result} tomorrow {e}",
        bn: "আজকের {actionBn} আগামীকালের {resultBn} নির্ধারণ করে {e}",
        slots: {
          action: [
            ["habit", "অভ্যাস"],
            ["effort", "পরিশ্রম"],
            ["choice", "পছন্দ"],
            ["mindset", "মানসিকতা"],
            ["routine", "রুটিন"],
            ["attitude", "মনোভাব"],
          ],
          result: [
            ["future", "ভবিষ্যৎ"],
            ["success", "সাফল্য"],
            ["reality", "বাস্তবতা"],
            ["destiny", "ভাগ্য"],
            ["outcome", "ফলাফল"],
            ["tomorrow", "আগামীকাল"],
          ],
        },
      },
      {
        en: "Success is made of {brick}, not {wish} {e}",
        bn: "সাফল্য তৈরি হয় {brickBn} দিয়ে, {wishBn} দিয়ে নয় {e}",
        slots: {
          brick: [
            ["hard work", "কঠোর পরিশ্রম"],
            ["small wins", "ছোট জয়"],
            ["good habits", "ভালো অভ্যাস"],
            ["focus", "একাগ্রতা"],
            ["repetition", "পুনরাবৃত্তি"],
          ],
          wish: [
            ["luck", "ভাগ্য"],
            ["dreaming", "স্বপ্ন দেখা"],
            ["hoping", "আশা"],
            ["wishing", "কামনা"],
          ],
        },
      },
      {
        en: "I am not {watching}; I am {building} {e}",
        bn: "আমি {watchingBn} না; আমি {buildingBn} {e}",
        slots: {
          watching: [
            ["waiting", "অপেক্ষা করছি"],
            ["watching", "দেখছি"],
            ["wishing", "কামনা করছি"],
            ["talking", "কথা বলছি"],
          ],
          building: [
            ["building", "গড়ছি"],
            ["grinding", "পরিশ্রম করছি"],
            ["growing", "বড় হচ্ছি"],
            ["hustling", "কঠোর পরিশ্রম করছি"],
            ["creating", "সৃষ্টি করছি"],
            ["learning", "শিখছি"],
          ],
        },
      },
      {
        en: "Make your {target} afraid of your {effort} {e}",
        bn: "আপনার {targetBn}-কে আপনার {effortBn} দিয়ে কাঁপিয়ে দিন {e}",
        slots: {
          target: [
            ["goals", "লক্ষ্য"],
            ["competition", "প্রতিযোগিতা"],
            ["doubts", "সন্দেহ"],
            ["fears", "ভয়"],
          ],
          effort: [
            ["work ethic", "কর্মনিষ্ঠা"],
            ["discipline", "শৃঙ্খলা"],
            ["consistency", "অবিচলতা"],
            ["grind", "পরিশ্রম"],
          ],
        },
      },
      {
        en: "No {excuse} is worth a {dream} {e}",
        bn: "কোনো {excuseBn} কোনো {dreamBn}-এর চেয়ে বেশি মূল্যবান নয় {e}",
        slots: {
          excuse: [
            ["excuse", "অজুহাত"],
            ["shortcut", "শর্টকাট"],
            ["delay", "দেরি"],
            ["complaint", "অভিযোগ"],
            ["comfort", "আরাম"],
          ],
          dream: [
            ["dream", "স্বপ্ন"],
            ["goal", "লক্ষ্য"],
            ["future", "ভবিষ্যৎ"],
            ["vision", "দর্শন"],
          ],
        },
      },
      {
        en: "The {price} of success is {payment} {e}",
        bn: "সাফল্যের {priceBn} হলো {paymentBn} {e}",
        slots: {
          price: [
            ["ticket", "টিকিট"],
            ["cost", "মূল্য"],
            ["secret", "গোপন"],
            ["formula", "সূত্র"],
            ["recipe", "রেসিপি"],
          ],
          payment: [
            ["hard work", "কঠোর পরিশ্রম"],
            ["sacrifice", "ত্যাগ"],
            ["patience", "ধৈর্য"],
            ["persistence", "অধ্যবসায়"],
            ["dedication", "নিষ্ঠা"],
          ],
        },
      },
      {
        en: "I {win} {when} I {prepare} {e}",
        bn: "আমি {whenBn} {prepareBn} বলেই {winBn} {e}",
        slots: {
          win: [
            ["win", "জিতি"],
            ["succeed", "সফল হই"],
            ["shine", "উজ্জ্বল হই"],
            ["lead", "এগিয়ে থাকি"],
          ],
          when: [
            ["because", "কারণ"],
            ["since", "যেহেতু"],
            ["always", "সবসময়"],
            ["once", "একবার"],
            ["whenever", "যতবার"],
          ],
          prepare: [
            ["prepare", "প্রস্তুতি নিই"],
            ["plan", "পরিকল্পনা করি"],
            ["grind", "পরিশ্রম করি"],
            ["stay ready", "প্রস্তুত থাকি"],
            ["train", "অনুশীলন করি"],
            ["focus", "মনোযোগ দিই"],
          ],
        },
      },
    ],
  },
  breakup: {
    emojis: ["😭", "💔", "🌧️", "🥀", "🖤", "💧", "🕊️", "🌑", "🪞", "🚪"],
    statics: [
      ["Some endings are just a beginning wearing a disguise 🥀", "কিছু সমাপ্তি আসলে শুরুর ছদ্মবেশে আসে 🥀"],
      ["I lost you, but I found myself 💔", "তোমাকে হারালাম, কিন্তু নিজেকে খুঁজে পেলাম 💔"],
      ["Letting go is not giving up; it is choosing peace 🌧️", "ছেড়ে দেওয়া হাল ছাড়া নয়; এটা শান্তি বেছে নেওয়া 🌧️"],
      ["My heart broke, but my story did not end 🖤", "আমার হৃদয় ভেঙেছে, কিন্তু আমার গল্প শেষ হয়নি 🖤"],
      ["Sometimes goodbye is the kindest word 🌧️", "কখনো কখনো বিদায়ই সবচেয়ে স্নেহের শব্দ 🌧️"],
      ["I am not crying over you; I am crying over the person I thought you were 😭", "আমি তোমার জন্য কাঁদছি না; আমি কাঁদছি যাকে তুমি ছিলে বলে ভেবেছিলাম, তার জন্য 😭"],
      ["Grief is love with nowhere to go 🕊️", "শোক হলো ভালোবাসা, যার যাওয়ার জায়গা নেই 🕊️"],
      ["Healing is not a straight line; it is a messy, beautiful journey 💧", "সুস্থ হওয়া সরল রেখা নয়; এটা জটিল, সুন্দর এক যাত্রা 💧"],
      ["You can love someone and still let them go — that is strength 🪞", "কাউকে ভালোবেসেও ছেড়ে দেওয়া যায় — এটাই শক্তি 🪞"],
      ["Some people are lessons, not love stories 💔", "কিছু মানুষ পাঠ, প্রেমের গল্প নয় 💔"],
      ["The door closed, but my new beginning just opened 🚪", "এক দরজা বন্ধ হলো, কিন্তু আমার নতুন শুরু খুলে গেল 🚪"],
      ["I will be okay; I always am 🥀", "আমি ঠিক হয়ে যাব; আমি সবসময় ঠিক হয়ে যাই 🥀"],
    ],
    groups: [
      {
        en: "It {hurts} now, but {future} will be {brighter} {e}",
        bn: "এখন {hurtsBn}, কিন্তু {futureBn} অনেক {brighterBn} হবে {e}",
        slots: {
          hurts: [
            ["hurts", "কষ্ট হচ্ছে"],
            ["aches", "ব্যথা দিচ্ছে"],
            ["stings", "দংশন করছে"],
            ["burns", "জ্বলছে"],
          ],
          future: [
            ["tomorrow", "আগামীকাল"],
            ["someday", "কোনো একদিন"],
            ["my future", "আমার ভবিষ্যৎ"],
            ["the next chapter", "পরবর্তী অধ্যায়"],
            ["my healing", "আমার সুস্থ হওয়া"],
          ],
          brighter: [
            ["brighter", "উজ্জ্বল"],
            ["better", "ভালো"],
            ["beautiful", "সুন্দর"],
            ["peaceful", "শান্তিময়"],
            ["lighter", "হালকা"],
          ],
        },
      },
      {
        en: "I gave you my {everything}, you gave me your {nothing} {e}",
        bn: "আমি তোমাকে দিয়েছিলাম আমার {everythingBn}, তুমি দিয়েছিলে {nothingBn} {e}",
        slots: {
          everything: [
            ["heart", "হৃদয়"],
            ["time", "সময়"],
            ["trust", "বিশ্বাস"],
            ["world", "জগৎ"],
            ["love", "ভালোবাসা"],
            ["best years", "সেরা বছরগুলো"],
          ],
          nothing: [
            ["goodbye", "বিদায়"],
            ["silence", "নীরবতা"],
            ["pain", "যন্ত্রণা"],
            ["a lie", "মিথ্যা"],
            ["neglect", "অবহেলা"],
            ["half a heart", "অর্ধেক হৃদয়"],
          ],
        },
      },
      {
        en: "Letting you go was {hard}, but keeping you was {harder} {e}",
        bn: "তোমাকে ছেড়ে দেওয়াটা {hardBn} ছিল, কিন্তু রেখে দেওয়াটা {harderBn} ছিল {e}",
        slots: {
          hard: [
            ["hard", "কঠিন"],
            ["painful", "যন্ত্রণাদায়ক"],
            ["the hardest thing", "সবচেয়ে কঠিন কাজ"],
            ["a storm", "এক ঝড়"],
          ],
          harder: [
            ["harder", "আরও কঠিন"],
            ["impossible", "অসম্ভব"],
            ["destroying me", "আমাকে ধ্বংস করা"],
            ["not love", "প্রেম না"],
          ],
        },
      },
      {
        en: "I do not miss you; I miss {thing} we {used} to have {e}",
        bn: "আমি তোমাকে মিস করি না; আমি মিস করি {thingBn} যা আমরা {usedBn} {e}",
        slots: {
          thing: [
            ["the laughs", "হাসিগুলো"],
            ["the talks", "কথাগুলো"],
            ["the dreams", "স্বপ্নগুলো"],
            ["the peace", "শান্তিটা"],
            ["the trust", "বিশ্বাসটা"],
            ["the warmth", "উষ্ণতাটা"],
          ],
          used: [
            ["used", "একসময় ছিলাম"],
            ["once had", "একসময় পেতাম"],
            ["shared", "ভাগ করতাম"],
            ["built", "গড়েছিলাম"],
          ],
        },
      },
      {
        en: "You were my {home}, now I am {homeless} {e}",
        bn: "তুমি ছিলে আমার {homeBn}, এখন আমি {homelessBn} {e}",
        slots: {
          home: [
            ["home", "ঘর"],
            ["shelter", "আশ্রয়"],
            ["safe place", "নিরাপদ জায়গা"],
            ["calm", "শান্তি"],
            ["comfort", "স্বস্তি"],
          ],
          homeless: [
            ["homeless", "গৃহহীন"],
            ["a stranger", "অপরিচিত"],
            ["lost", "হারিয়ে যাওয়া"],
            ["rebuilding", "আবার গড়ছি"],
            ["finding home within", "নিজের ভেতরে ঘর খুঁজছি"],
          ],
        },
      },
      {
        en: "One day you will {realize} what you {lost} {e}",
        bn: "একদিন তুমি {realizeBn} কী {lostBn} {e}",
        slots: {
          realize: [
            ["realize", "উপলব্ধি করবে"],
            ["understand", "বুঝবে"],
            ["regret", "অনুশোচনা করবে"],
            ["remember", "মনে করবে"],
          ],
          lost: [
            ["lost", "হারিয়েছ"],
            ["broke", "ভেঙেছ"],
            ["threw away", "ছুঁড়ে ফেলেছ"],
            ["left behind", "পেছনে ফেলে এসেছ"],
          ],
        },
      },
      {
        en: "My {heart} is healing {slowly}, and that is okay {e}",
        bn: "আমার {heartBn} {slowlyBn} সুস্থ হচ্ছে, আর এটা ঠিক আছে {e}",
        slots: {
          heart: [
            ["heart", "হৃদয়"],
            ["soul", "আত্মা"],
            ["mind", "মন"],
            ["spirit", "প্রাণ"],
          ],
          slowly: [
            ["slowly", "ধীরে ধীরে"],
            ["quietly", "নীরবে"],
            ["one day at a time", "দিনে দিনে"],
            ["piece by piece", "টুকরো টুকরো"],
            ["gently", "আস্তে আস্তে"],
          ],
        },
      },
      {
        en: "You chose {them}; I chose {myself} {e}",
        bn: "তুমি বেছে নিলে {themBn}; আমি বেছে নিলাম {myselfBn} {e}",
        slots: {
          them: [
            ["someone else", "অন্য কাউকে"],
            ["your pride", "তোমার অহংকার"],
            ["the easy road", "সহজ পথ"],
            ["a fresh start", "একটা নতুন শুরু"],
          ],
          myself: [
            ["myself", "নিজেকে"],
            ["my peace", "আমার শান্তিকে"],
            ["my growth", "আমার বিকাশকে"],
            ["healing", "সুস্থতাকে"],
          ],
        },
      },
      {
        en: "I did not stop loving; I stopped {waiting} {e}",
        bn: "ভালোবাসা থামাইনি; আমি শুধু {waitingBn} থামিয়েছি {e}",
        slots: {
          waiting: [
            ["waiting for you", "তোমার জন্য অপেক্ষা"],
            ["expecting change", "পরিবর্তনের আশা"],
            ["hoping", "আশা করা"],
            ["hurting myself", "নিজেকে কষ্ট দেওয়া"],
            ["going back", "ফিরে যাওয়া"],
          ],
        },
      },
      {
        en: "The {memory} fades, but the {lesson} stays {e}",
        bn: "{memoryBn} ম্লান হয়ে যায়, কিন্তু {lessonBn} থেকে যায় {e}",
        slots: {
          memory: [
            ["pain", "যন্ত্রণা"],
            ["hurt", "কষ্ট"],
            ["tears", "অশ্রু"],
            ["ache", "বেদনা"],
            ["anger", "রাগ"],
          ],
          lesson: [
            ["lesson", "শিক্ষা"],
            ["strength", "শক্তি"],
            ["wisdom", "জ্ঞান"],
            ["growth", "বিকাশ"],
            ["peace", "শান্তি"],
          ],
        },
      },
    ],
  },
  happy: {
    emojis: ["😊", "✨", "🌈", "😄", "🌞", "🎉", "💫", "🌸", "🥳", "🌟"],
    statics: [
      ["Smile more; it confuses the people who doubted you 😊", "আরও হাসুন; যারা আপনার ওপর সন্দেহ করেছিল তাদের বিভ্রান্ত করবে 😊"],
      ["Happiness is not a destination; it is a way of living ✨", "সুখ কোনো গন্তব্য নয়; এটা বেঁচে থাকার এক উপায় ✨"],
      ["Choose joy every single morning 🌞", "প্রতিটি সকালে আনন্দ বেছে নিন 🌞"],
      ["Your smile can light up someone's whole day 😄", "আপনার হাসি কারো পুরো দিন আলোকিত করতে পারে 😄"],
      ["Be the reason someone believes in good days 🌈", "কারো ভালো দিনের ওপর বিশ্বাসের কারণ হয়ে উঠুন 🌈"],
      ["Life is better when you are laughing 🎉", "আপনি হাসলে জীবন আরও ভালো হয় 🎉"],
      ["Positive mind, positive vibes, positive life ✨", "ইতিবাচক মন, ইতিবাচক ভাবনা, ইতিবাচক জীবন ✨"],
      ["Happiness is homemade; stop waiting for others to bring it 🌸", "সুখ নিজের হাতে গড়া; অন্যের জন্য অপেক্ষা করা বন্ধ করুন 🌸"],
      ["Today is a good day to have a good day 🌞", "ভালো দিন কাটানোর জন্য আজই ভালো দিন 😊"],
      ["Count your blessings, not your problems 🌟", "সমস্যা নয়, প্রাপ্তি গণনা করুন 🌟"],
      ["A joyful heart makes everything brighter 🌈", "আনন্দময় হৃদয় সবকিছু উজ্জ্বল করে তোলে 🌈"],
      ["Laugh often, love much, live fully 🥳", "বেশি হাসুন, বেশি ভালোবাসুন, পূর্ণভাবে বাঁচুন 🥳"],
    ],
    groups: [
      {
        en: "My {recipe} for happiness is {ingredient} {e}",
        bn: "আমার সুখের {recipeBn} হলো {ingredientBn} {e}",
        slots: {
          recipe: [
            ["recipe", "রেসিপি"],
            ["formula", "সূত্র"],
            ["secret", "গোপন"],
            ["medicine", "ঔষধ"],
            ["cure", "প্রতিকার"],
          ],
          ingredient: [
            ["gratitude", "কৃতজ্ঞতা"],
            ["laughter", "হাসি"],
            ["kindness", "দয়া"],
            ["small joys", "ছোট আনন্দ"],
            ["good company", "ভালো সঙ্গ"],
            ["hope", "আশা"],
          ],
        },
      },
      {
        en: "Smile {time}; it changes {what} {e}",
        bn: "{timeBn} হাসুন; এটা {whatBn} বদলে দেয় {e}",
        slots: {
          time: [
            ["every morning", "প্রতিদিন সকালে"],
            ["even on hard days", "কঠিন দিনেও"],
            ["when no one is watching", "কেউ না দেখলেও"],
            ["always", "সবসময়"],
          ],
          what: [
            ["your mood", "আপনার মেজাজ"],
            ["your day", "আপনার দিন"],
            ["everything", "সবকিছু"],
            ["the world around you", "আপনার চারপাশ"],
          ],
        },
      },
      {
        en: "Happiness is {found} in {place}, not in {search} {e}",
        bn: "সুখ {placeBn} {foundBn} যায়, {searchBn} নয় {e}",
        slots: {
          found: [
            ["found", "খুঁজে পাওয়া"],
            ["discovered", "আবিষ্কৃত"],
            ["hidden", "লুকিয়ে"],
            ["grown", "বেড়ে ওঠে"],
          ],
          place: [
            ["the little things", "ছোট ছোট জিনিসে"],
            ["giving", "দানে"],
            ["today", "আজ"],
            ["the present", "বর্তমানে"],
            ["connection", "সম্পর্কে"],
          ],
          search: [
            ["chasing", "অন্বেষণে"],
            ["buying", "কেনার মধ্যে"],
            ["waiting", "অপেক্ষায়"],
            ["comparing", "তুলনায়"],
          ],
        },
      },
      {
        en: "Find joy in {small}; {big} will follow {e}",
        bn: "ছোট {smallBn} থেকে আনন্দ খুঁজুন; {bigBn} নিজে থেকেই আসবে {e}",
        slots: {
          small: [
            ["little moments", "ছোট মুহূর্ত"],
            ["simple things", "সাধারণ জিনিস"],
            ["small wins", "ছোট জয়"],
            ["tiny blessings", "ক্ষুদ্র প্রাপ্তি"],
          ],
          big: [
            ["big things", "বড় জিনিস"],
            ["everything else", "বাকি সবকিছু"],
            ["happiness", "সুখ"],
            ["abundance", "প্রাচুর্য"],
          ],
        },
      },
      {
        en: "I choose to be {happy}, because {reason} {e}",
        bn: "আমি {happyBn} থাকতে চাই, কারণ {reasonBn} {e}",
        slots: {
          happy: [
            ["happy", "খুশি"],
            ["grateful", "কৃতজ্ঞ"],
            ["hopeful", "আশাবাদী"],
            ["positive", "ইতিবাচক"],
            ["cheerful", "প্রফুল্ল"],
          ],
          reason: [
            ["it is my choice", "এটা আমার পছন্দ"],
            ["life is short", "জীবন ছোট"],
            ["my peace matters more", "আমার শান্তিই আসল"],
            ["joy is contagious", "আনন্দ ছোঁয়াচে"],
          ],
        },
      },
      {
        en: "Laughter is the best {medicine} for every {mood} {e}",
        bn: "হাসি প্রতিটি {moodBn}-এর জন্য সেরা {medicineBn} {e}",
        slots: {
          medicine: [
            ["medicine", "ঔষধ"],
            ["therapy", "থেরাপি"],
            ["remedy", "প্রতিকার"],
            ["tonic", "টনিক"],
            ["cure", "প্রতিষেধক"],
          ],
          mood: [
            ["sad day", "দুঃখের দিন"],
            ["tired heart", "ক্লান্ত হৃদয়"],
            ["stressful moment", "চাপের মুহূর্ত"],
            ["cloudy mind", "মেঘলা মন"],
          ],
        },
      },
      {
        en: "Gratitude turns {what} into {enough} {e}",
        bn: "কৃতজ্ঞতা {whatBn}কে পরিণত করে {enoughBn}-এ {e}",
        slots: {
          what: [
            ["what we have", "আমাদের যা আছে"],
            ["ordinary days", "সাধারণ দিন"],
            ["little things", "ছোট জিনিস"],
            ["challenges", "চ্যালেঞ্জ"],
          ],
          enough: [
            ["enough", "পর্যাপ্ত"],
            ["plenty", "প্রচুর"],
            ["joy", "আনন্দ"],
            ["blessings", "প্রাপ্তি"],
          ],
        },
      },
      {
        en: "The sun rises every day; you can rise {too} {e}",
        bn: "সূর্য প্রতিদিন ওঠে; আপনিও {tooBn} উঠতে পারেন {e}",
        slots: {
          too: [
            ["too", "ও"],
            ["again", "আবারও"],
            ["as well", "একইভাবে"],
            ["once more", "আবার একবার"],
          ],
        },
      },
      {
        en: "Happiness looks {beautiful} on {you} {e}",
        bn: "{youBn} ওপর সুখ {beautifulBn} লাগে {e}",
        slots: {
          beautiful: [
            ["beautiful", "খুব সুন্দর"],
            ["good", "ভালো"],
            ["amazing", "দারুণ"],
            ["radiant", "উজ্জ্বল"],
          ],
          you: [
            ["you", "আপনার"],
            ["everyone", "সবার"],
            ["your soul", "আপনার আত্মার"],
            ["the world", "পৃথিবীর"],
          ],
        },
      },
      {
        en: "Make today {better} than yesterday {e}",
        bn: "আজকে গতকালের চেয়ে {betterBn} করুন {e}",
        slots: {
          better: [
            ["better", "ভালো"],
            ["brighter", "উজ্জ্বল"],
            ["happier", "আনন্দময়"],
            ["lighter", "হালকা"],
            ["kinder", "সদয়"],
          ],
        },
      },
    ],
  },
  alone: {
    emojis: ["🌙", "🕯️", "🌌", "🧘", "🍂", "🌫️", "🪐", "🌊", "🕰️", "☕"],
    statics: [
      ["Sometimes being alone is the best company 🌙", "কখনো কখনো একা থাকাটাই সবচেয়ে ভালো সঙ্গ 🌙"],
      ["I am alone, but I am never lonely 🌌", "আমি একা, কিন্তু আমি কখনো নিঃসঙ্গ নই 🌌"],
      ["Solitude is where I find my strength 🧘", "নিঃসঙ্গতায় আমি আমার শক্তি খুঁজে পাই 🧘"],
      ["Not everyone who walks alone is lost 🍂", "যারা একা হাঁটে, তারা সবাই হারিয়ে যায় না 🍂"],
      ["My silence is my favorite conversation 🕯️", "আমার নীরবতাই আমার প্রিয় কথোপকথন 🕯️"],
      ["Learn to be alone; your peace depends on it 🌊", "একা থাকতে শিখুন; আপনার শান্তি এর ওপর নির্ভর করে 🌊"],
      ["I found myself in the quiet I once feared 🌫️", "একসময় যাকে ভয় পেতাম, সেই নীরবতায় নিজেকে খুঁজে পেয়েছি 🌫️"],
      ["Better alone than in bad company 🕰️", "খারাপ সঙ্গের চেয়ে একা থাকা ভালো 🕰️"],
      ["Solitude is not loneliness; it is freedom 🪐", "নিঃসঙ্গতা একাকীত্ব নয়; এটা স্বাধীনতা 🪐"],
      ["In the silence, I hear my own truth ☕", "নীরবতায় আমি আমার নিজের সত্য শুনতে পাই ☕"],
      ["A little solitude heals a lot of chaos 🌙", "অল্প একটু নিঃসঙ্গতা অনেক বিশৃঙ্খলা সারায় 🌙"],
      ["I am enough company for myself 🕯️", "নিজের জন্য আমি নিজেই যথেষ্ট সঙ্গ 🕯️"],
    ],
    groups: [
      {
        en: "I {walk} alone, but I {carry} my {peace} {e}",
        bn: "আমি একাই {walkBn}, কিন্তু {peaceBn} আমি নিজেই {carryBn} {e}",
        slots: {
          walk: [
            ["walk", "হাঁটি"],
            ["sit", "বসি"],
            ["wander", "ঘুরে বেড়াই"],
            ["move", "চলি"],
          ],
          carry: [
            ["carry", "ধারণ করি"],
            ["keep", "রাখি"],
            ["protect", "রক্ষা করি"],
            ["hold", "আঁকড়ে থাকি"],
          ],
          peace: [
            ["peace", "শান্তি"],
            ["dreams", "স্বপ্ন"],
            ["strength", "শক্তি"],
            ["calm", "প্রশান্তি"],
            ["silence", "নীরবতা"],
          ],
        },
      },
      {
        en: "The night teaches me that {rest} is also {work} {e}",
        bn: "রাত শেখায়, {restBn}-ও এক ধরনের {workBn} {e}",
        slots: {
          rest: [
            ["rest", "বিশ্রাম"],
            ["silence", "নীরবতা"],
            ["stillness", "স্থিরতা"],
            ["slowing down", "ধীর গতি"],
          ],
          work: [
            ["work", "কাজ"],
            ["growth", "বিকাশ"],
            ["strength", "শক্তি"],
            ["preparation", "প্রস্তুতি"],
          ],
        },
      },
      {
        en: "I am not {lonely}; I am {free} {e}",
        bn: "আমি {lonelyBn} নই; আমি {freeBn} {e}",
        slots: {
          lonely: [
            ["lonely", "নিঃসঙ্গ"],
            ["lost", "হারানো"],
            ["broken", "ভাঙা"],
            ["empty", "ফাঁকা"],
            ["invisible", "অদৃশ্য"],
          ],
          free: [
            ["free", "স্বাধীন"],
            ["at peace", "শান্তিতে"],
            ["whole", "পরিপূর্ণ"],
            ["enough", "যথেষ্ট"],
            ["growing", "বড় হচ্ছি"],
          ],
        },
      },
      {
        en: "Being alone {taught} me {lesson} {e}",
        bn: "একা থাকা আমাকে {lessonBn} {taughtBn} {e}",
        slots: {
          taught: [
            ["taught", "শিখিয়েছে"],
            ["showed", "দেখিয়েছে"],
            ["gave", "দিয়েছে"],
            ["gifted", "উপহার দিয়েছে"],
          ],
          lesson: [
            ["self-love", "নিজেকে ভালোবাসা"],
            ["patience", "ধৈর্য"],
            ["strength", "শক্তি"],
            ["independence", "স্বনির্ভরতা"],
            ["peace", "শান্তি"],
            ["my worth", "আমার মূল্য"],
          ],
        },
      },
      {
        en: "My best {moments} happen in {place} {e}",
        bn: "আমার সেরা {momentsBn} ঘটে {placeBn} {e}",
        slots: {
          moments: [
            ["ideas", "ভাবনা"],
            ["thoughts", "চিন্তা"],
            ["conversations", "কথোপকথন"],
            ["dreams", "স্বপ্ন"],
          ],
          place: [
            ["silence", "নীরবতায়"],
            ["my room", "আমার ঘরে"],
            ["late nights", "গভীর রাতে"],
            ["the moonlight", "চাঁদের আলোয়"],
          ],
        },
      },
      {
        en: "Some {seasons} are meant to be {experienced} alone {e}",
        bn: "কিছু {seasonsBn} একা {experiencedBn} করার জন্যই {e}",
        slots: {
          seasons: [
            ["seasons", "ঋতু"],
            ["chapters", "অধ্যায়"],
            ["storms", "ঝড়"],
            ["journeys", "যাত্রা"],
          ],
          experienced: [
            ["lived", "যাপন করা"],
            ["faced", "মোকাবিলা করা"],
            ["embraced", "আলিঙ্গন করা"],
            ["survived", "পার করা"],
          ],
        },
      },
      {
        en: "I talk to {myself} more than anyone else — and it {helps} {e}",
        bn: "আমি সবার চেয়ে বেশি {myselfBn} কথা বলি — আর এটা {helpsBn} {e}",
        slots: {
          myself: [
            ["myself", "নিজের সাথে"],
            ["the stars", "তারাদের সাথে"],
            ["my thoughts", "আমার চিন্তার সাথে"],
            ["the silence", "নীরবতার সাথে"],
          ],
          helps: [
            ["helps", "সাহায্য করে"],
            ["heals", "সারায়"],
            ["calms", "শান্ত করে"],
            ["clears my mind", "মন পরিষ্কার করে"],
          ],
        },
      },
      {
        en: "When the world is {loud}, I choose {quiet} {e}",
        bn: "পৃথিবী যখন {loudBn}, আমি তখন {quietBn} বেছে নিই {e}",
        slots: {
          loud: [
            ["loud", "কোলাহলপূর্ণ"],
            ["busy", "ব্যস্ত"],
            ["heavy", "ভারী"],
            ["harsh", "কঠোর"],
          ],
          quiet: [
            ["quiet", "নীরবতা"],
            ["my corner", "আমার কোণ"],
            ["silence", "নীরবতাকে"],
            ["peace", "শান্তিকে"],
          ],
        },
      },
      {
        en: "I have learned to {enjoy} my own {company} {e}",
        bn: "আমি নিজের {companyBn} {enjoyBn} শিখেছি {e}",
        slots: {
          enjoy: [
            ["enjoy", "উপভোগ করতে"],
            ["love", "ভালোবাসতে"],
            ["value", "মূল্য দিতে"],
            ["trust", "বিশ্বাস করতে"],
          ],
          company: [
            ["company", "সঙ্গ"],
            ["presence", "উপস্থিতি"],
            ["voice", "কণ্ঠস্বর"],
            ["world", "জগৎ"],
          ],
        },
      },
      {
        en: "The moon {shines} best when it is {alone} {e}",
        bn: "চাঁদ {aloneBn} থাকলেই সবচেয়ে ভালো {shinesBn} {e}",
        slots: {
          shines: [
            ["shines", "জ্বলে"],
            ["glows", "উজ্জ্বল হয়"],
            ["smiles", "হাসে"],
            ["rests", "বিশ্রাম নেয়"],
          ],
          alone: [
            ["alone", "একা"],
            ["in the dark", "অন্ধকারে"],
            ["in silence", "নীরবে"],
            ["at night", "রাতে"],
          ],
        },
      },
    ],
  },
  nature: {
    emojis: ["🌿", "🌸", "🌅", "🌊", "🍃", "🌄", "🌻", "🦋", "🌱", "🌳"],
    statics: [
      ["Nature does not hurry, yet everything gets done 🌿", "প্রকৃতি তাড়াহুড়ো করে না, তবু সবকিছু শেষ হয় 🌿"],
      ["Take only memories, leave only footprints 🌊", "শুধু স্মৃতি নিন, শুধু পদচিহ্ন রেখে যান 🌊"],
      ["In every walk with nature, one receives far more than he seeks 🌳", "প্রকৃতির সাথে প্রতিটি হাঁটায় মানুষ যা খোঁজে তার চেয়ে বেশি পায় 🌳"],
      ["The earth laughs in flowers 🌸", "পৃথিবী ফুলে ফুলে হাসে 🌸"],
      ["Look deep into nature, and you will understand everything better 🌅", "প্রকৃতির গভীরে তাকান, আর সবকিছু আরও ভালো বুঝতে পারবেন 🌅"],
      ["Green is the prime color of the world 🌿", "সবুজই পৃথিবীর প্রধান রং 🌿"],
      ["A walk in nature walks the soul back home 🌄", "প্রকৃতিতে হাঁটা আত্মাকে আবার ঘরে ফিরিয়ে আনে 🌄"],
      ["Nature is not a place to visit; it is home 🍃", "প্রকৃতি ভ্রমণের জায়গা নয়; এটা ঘর 🍃"],
      ["The mountains are calling, and I must go 🌄", "পাহাড় ডাকছে, আর আমাকে যেতেই হবে 🌄"],
      ["Flowers are the music of the ground 🌻", "ফুল হলো মাটির সংগীত 🌻"],
      ["Breathe in the calm; the forest has the answers 🌳", "শান্তি নিঃশ্বাস নিন; জঙ্গলের কাছেই সব উত্তর 🌳"],
      ["Chase waterfalls, not worries 🌊", "চিন্তা নয়, জলপ্রপাতের পেছনে ছুটুন 🌊"],
    ],
    groups: [
      {
        en: "The {element} reminds me how {quality} life is {e}",
        bn: "{elementBn} মনে করিয়ে দেয় জীবন কতটা {qualityBn} {e}",
        slots: {
          element: [
            ["sunrise", "সূর্যোদয়"],
            ["ocean", "সমুদ্র"],
            ["forest", "জঙ্গল"],
            ["sky", "আকাশ"],
            ["river", "নদী"],
            ["breeze", "বাতাস"],
          ],
          quality: [
            ["beautiful", "সুন্দর"],
            ["fragile", "ভঙ্গুর"],
            ["precious", "মূল্যবান"],
            ["peaceful", "শান্তিময়"],
            ["short", "সংক্ষিপ্ত"],
            ["vast", "বিশাল"],
          ],
        },
      },
      {
        en: "Every {thing} has a story told by {element} {e}",
        bn: "প্রতিটি {thingBn}-এর গল্প বলে {elementBn} {e}",
        slots: {
          thing: [
            ["leaf", "পাতা"],
            ["flower", "ফুল"],
            ["stone", "পাথর"],
            ["wave", "ঢেউ"],
            ["star", "তারা"],
            ["shadow", "ছায়া"],
          ],
          element: [
            ["the wind", "বাতাস"],
            ["the rain", "বৃষ্টি"],
            ["the sun", "সূর্য"],
            ["the sea", "সমুদ্র"],
            ["the forest", "জঙ্গল"],
          ],
        },
      },
      {
        en: "Sit {place} and let nature {heal} you {e}",
        bn: "{placeBn} বসুন আর প্রকৃতিকে আপনাকে {healBn} দিন {e}",
        slots: {
          place: [
            ["under the trees", "গাছের নিচে"],
            ["by the river", "নদীর ধারে"],
            ["on the grass", "ঘাসের ওপর"],
            ["in the garden", "বাগানে"],
            ["near the sea", "সমুদ্রের কাছে"],
            ["in the mountains", "পাহাড়ে"],
          ],
          heal: [
            ["heal", "সারাতে"],
            ["calm", "শান্ত করতে"],
            ["teach", "শেখাতে"],
            ["renew", "নতুন করতে"],
          ],
        },
      },
      {
        en: "The {sky} writes poems in {colors} {e}",
        bn: "{skyBn} {colorsBn} দিয়ে কবিতা লেখে {e}",
        slots: {
          sky: [
            ["sky", "আকাশ"],
            ["sunset", "সূর্যাস্ত"],
            ["dawn", "ভোর"],
            ["storm", "ঝড়"],
          ],
          colors: [
            ["gold and pink", "সোনালি ও গোলাপি রঙে"],
            ["shades of blue", "নীলের বিভিন্ন ছায়ায়"],
            ["purple and orange", "বেগুনি ও কমলায়"],
            ["soft grey", "নরম ধূসরে"],
          ],
        },
      },
      {
        en: "I speak to {nature} because it never {judges} {e}",
        bn: "আমি {natureBn} কথা বলি, কারণ এটা কখনো {judgesBn} {e}",
        slots: {
          nature: [
            ["the moon", "চাঁদের সাথে"],
            ["the ocean", "সমুদ্রের সাথে"],
            ["the wind", "বাতাসের সাথে"],
            ["the rain", "বৃষ্টির সাথে"],
            ["the sky", "আকাশের সাথে"],
            ["a lone tree", "একটি একলা গাছের সাথে"],
          ],
          judges: [
            ["judges", "বিচার করে না"],
            ["interrupts", "থামায় না"],
            ["lies", "মিথ্যা বলে না"],
            ["leaves", "চলে যায় না"],
          ],
        },
      },
      {
        en: "Let the {breeze} carry your {burden} away {e}",
        bn: "{breezeBn} আপনার {burdenBn} উড়িয়ে নিয়ে যাক {e}",
        slots: {
          breeze: [
            ["breeze", "হাওয়া"],
            ["rain", "বৃষ্টি"],
            ["river", "নদী"],
            ["wind", "বাতাস"],
            ["tide", "জোয়ার"],
          ],
          burden: [
            ["worries", "চিন্তা"],
            ["stress", "চাপ"],
            ["sadness", "দুঃখ"],
            ["heaviness", "ভারাক্রান্ততা"],
            ["pain", "যন্ত্রণা"],
          ],
        },
      },
      {
        en: "Even the {smallest} {thing} has {beauty} {e}",
        bn: "সবচেয়ে {smallestBn} {thingBn}-ও {beautyBn} থাকে {e}",
        slots: {
          smallest: [
            ["smallest", "ছোট"],
            ["tiniest", "ক্ষুদ্রতম"],
            ["simplest", "সাধারণ"],
            ["quietest", "নীরব"],
          ],
          thing: [
            ["leaf", "পাতায়"],
            ["drop", "ফোঁটায়"],
            ["seed", "বীজে"],
            ["stone", "পাথরে"],
            ["bud", "কুঁড়িতে"],
          ],
          beauty: [
            ["beauty", "সৌন্দর্য"],
            ["purpose", "উদ্দেশ্য"],
            ["magic", "জাদু"],
            ["meaning", "অর্থ"],
          ],
        },
      },
      {
        en: "Watch the {scene} and forget the {noise} {e}",
        bn: "{sceneBn} দেখুন, {noiseBn} ভুলে যান {e}",
        slots: {
          scene: [
            ["sunrise", "সূর্যোদয়"],
            ["sunset", "সূর্যাস্ত"],
            ["waterfall", "জলপ্রপাত"],
            ["meadow", "তৃণভূমি"],
            ["moonrise", "চাঁদোদয়"],
          ],
          noise: [
            ["hurry", "তাড়াহুড়ো"],
            ["worries", "চিন্তা"],
            ["city chaos", "শহরের কোলাহল"],
            ["deadlines", "সময়সীমা"],
          ],
        },
      },
      {
        en: "Nature {gives} without {asking} {e}",
        bn: "প্রকৃতি {askingBn} ছাড়াই {givesBn} {e}",
        slots: {
          gives: [
            ["gives", "দেয়"],
            ["heals", "সারায়"],
            ["blooms", "ফুলে ওঠে"],
            ["grows", "বেড়ে ওঠে"],
          ],
          asking: [
            ["asking", "চাওয়া"],
            ["wanting", "প্রত্যাশা"],
            ["expecting", "আশা"],
            ["demanding", "দাবি"],
          ],
        },
      },
      {
        en: "{morning} in nature is {value} for the soul {e}",
        bn: "প্রকৃতিতে {morningBn} আত্মার জন্য {valueBn} {e}",
        slots: {
          morning: [
            ["A quiet morning", "একটি নীরব সকাল"],
            ["An early walk", "একটা ভোরে হাঁটা"],
            ["A slow sunrise", "একটা ধীর সূর্যোদয়"],
            ["Morning air", "সকালের বাতাস"],
          ],
          value: [
            ["medicine", "ঔষধ"],
            ["treasure", "ধন"],
            ["a blessing", "আশীর্বাদ"],
            ["ritual", "অভ্যাস"],
          ],
        },
      },
    ],
  },
  birthday: {
    emojis: ["🎂", "🎉", "🎈", "🎁", "🥳", "🎊", "✨", "💫", "🕯️", "🎈"],
    statics: [
      ["Another year older, another year wiser 🎂", "আরও এক বছর বড়, আরও এক বছর জ্ঞানী 🎂"],
      ["May your birthday be as wonderful as you are 🎉", "আপনার জন্মদিন হোক আপনার মতোই চমৎকার 🎉"],
      ["Count your life by smiles, not tears 🎂", "অশ্রু দিয়ে নয়, হাসি দিয়ে জীবন গণনা করুন 🎂"],
      ["Happy birthday to the one who makes life beautiful 🎁", "যিনি জীবনকে সুন্দর করেন, তার জন্মদিনের শুভেচ্ছা 🎁"],
      ["Another year of being awesome — keep going 🥳", "অসাধারণ থাকার আরও এক বছর — এগিয়ে চলুন 🥳"],
      ["Birthdays are nature's way of telling us to eat more cake 🎂", "জন্মদিন হলো প্রকৃতির একটি উপায় — আরও কেক খাওয়ার জন্য 🎂"],
      ["Wishing you a day full of love, laughter and cake 🎈", "ভালোবাসা, হাসি আর কেকে ভরা একটি দিন কামনা করছি 🎈"],
      ["Make a wish; the candles are watching ✨", "একটি ইচ্ছা করুন; মোমবাতিগুলো দেখছে ✨"],
      ["The best gift you can give yourself is a happy heart 🎁", "নিজেকে সবচেয়ে বড় উপহার হলো আনন্দময় হৃদয় 🎁"],
      ["Celebrate you today; you deserve it all 🎊", "আজ নিজেকে উদযাপন করুন; আপনি সবই পাওয়ার যোগ্য 🎊"],
      ["May this year bring you everything you never knew you needed 💫", "এই বছর আপনার জীবনে এমন সবকিছু আনুক, যা আপনার দরকার ছিল আপনি জানতেনও না 💫"],
      ["Happy birthday! May your dreams grow bigger every year 🕯️", "জন্মদিনের শুভেচ্ছা! আপনার স্বপ্ন প্রতি বছর আরও বড় হোক 🕯️"],
    ],
    groups: [
      {
        en: "Wishing you a birthday as {adjective} as {you} {e}",
        bn: "আপনাকে কামনা করছি {youBn} মতো {adjectiveBn} একটি জন্মদিন {e}",
        slots: {
          adjective: [
            ["wonderful", "চমৎকার"],
            ["bright", "উজ্জ্বল"],
            ["sweet", "মিষ্টি"],
            ["amazing", "দারুণ"],
            ["joyful", "আনন্দময়"],
            ["colorful", "রঙিন"],
          ],
          you: [
            ["you", "আপনি"],
            ["your smile", "আপনার হাসি"],
            ["your heart", "আপনার হৃদয়"],
            ["your dreams", "আপনার স্বপ্ন"],
          ],
        },
      },
      {
        en: "May your {year} be filled with {things} {e}",
        bn: "আপনার {yearBn} ভরে থাকুক {thingsBn} দিয়ে {e}",
        slots: {
          year: [
            ["new year", "নতুন বছর"],
            ["year ahead", "আগামী বছর"],
            ["days ahead", "আগামী দিনগুলো"],
            ["journey", "যাত্রা"],
          ],
          things: [
            ["love", "ভালোবাসা"],
            ["laughter", "হাসি"],
            ["success", "সাফল্য"],
            ["good health", "সুস্বাস্থ্য"],
            ["blessings", "প্রাপ্তি"],
            ["adventures", "অভিযান"],
          ],
        },
      },
      {
        en: "{celebrate} your birthday like the {legend} you are {e}",
        bn: "আপনি যে {legendBn} — সেই মতো আপনার জন্মদিন {celebrateBn} {e}",
        slots: {
          celebrate: [
            ["celebrate", "উদযাপন করুন"],
            ["enjoy", "উপভোগ করুন"],
            ["party", "পার্টি করুন"],
            ["cherish", "যত্ন করুন"],
          ],
          legend: [
            ["legend", "কিংবদন্তি"],
            ["star", "তারকা"],
            ["queen", "রানি"],
            ["king", "রাজা"],
            ["hero", "নায়ক"],
            ["gem", "রত্ন"],
          ],
        },
      },
      {
        en: "Another candle on the cake, another {dream} in the {sky} {e}",
        bn: "কেকের ওপর আরও একটি মোমবাতি, {skyBn} আরও একটি {dreamBn} {e}",
        slots: {
          dream: [
            ["dream", "স্বপ্ন"],
            ["wish", "ইচ্ছা"],
            ["hope", "আশা"],
            ["goal", "লক্ষ্য"],
          ],
          sky: [
            ["sky", "আকাশে"],
            ["heart", "হৃদয়ে"],
            ["horizon", "দিগন্তে"],
            ["future", "ভবিষ্যতে"],
          ],
        },
      },
      {
        en: "You are not getting {older}, you are getting {better} {e}",
        bn: "আপনি {olderBn} হচ্ছেন না, {betterBn} হচ্ছেন {e}",
        slots: {
          older: [
            ["older", "বড়"],
            ["worn out", "পুরনো"],
            ["slower", "ধীর"],
          ],
          better: [
            ["better", "ভালো"],
            ["wiser", "জ্ঞানী"],
            ["stronger", "শক্তিশালী"],
            ["finer", "উত্তম"],
            ["richer", "সমৃদ্ধ"],
            ["sharper", "তীক্ষ্ণ"],
          ],
        },
      },
      {
        en: "May this birthday open {doors} you never {imagined} {e}",
        bn: "এই জন্মদিন এমন {doorsBn} খুলে দিক, যা আপনি {imaginedBn} {e}",
        slots: {
          doors: [
            ["doors", "দরজা"],
            ["windows", "জানালা"],
            ["paths", "পথ"],
            ["chapters", "অধ্যায়"],
          ],
          imagined: [
            ["imagined", "ভাবেননি"],
            ["dreamed of", "স্বপ্নে দেখেননি"],
            ["expected", "আশা করেননি"],
            ["knew about", "জানতেন না"],
          ],
        },
      },
      {
        en: "Happy birthday to someone who {makes} {what} {e}",
        bn: "যে {whatBn} {makesBn} — তার জন্মদিনের শুভেচ্ছা {e}",
        slots: {
          makes: [
            ["makes", "করে তোলে"],
            ["keeps", "রাখে"],
            ["brings", "আনে"],
            ["turns", "তুলে ধরে"],
          ],
          what: [
            ["every day special", "প্রতিটি দিনকে বিশেষ"],
            ["every moment golden", "প্রতিটি মুহূর্তকে সোনালি"],
            ["every heart warm", "প্রতিটি হৃদয়ে উষ্ণতা"],
            ["every meal memorable", "প্রতিটি খাবারকে স্মরণীয়"],
          ],
        },
      },
      {
        en: "Blow the candles, make a wish, {begin} your year {e}",
        bn: "মোমবাতি নিভান, ইচ্ছা করুন, নিজের বছর {beginBn} {e}",
        slots: {
          begin: [
            ["begin", "শুরু করুন"],
            ["own", "নিজের করে নিন"],
            ["rock", "দাপিয়ে কাটান"],
            ["enjoy", "উপভোগ করুন"],
          ],
        },
      },
      {
        en: "Today the {world} celebrates {you} {e}",
        bn: "আজ {worldBn} {youBn} উদযাপন করছে {e}",
        slots: {
          world: [
            ["world", "পৃথিবী"],
            ["universe", "মহাবিশ্ব"],
            ["stars", "তারা"],
            ["angels", "ফেরেশতা"],
          ],
          you: [
            ["you", "আপনাকে"],
            ["your existence", "আপনার অস্তিত্বকে"],
            ["your smile", "আপনার হাসিকে"],
            ["the legend", "কিংবদন্তিকে"],
          ],
        },
      },
      {
        en: "May every {day} of your new {year} feel like a {celebration} {e}",
        bn: "নতুন {yearBn} এর প্রতিটি {dayBn} যেন {celebrationBn}-এর মতো লাগে {e}",
        slots: {
          day: [
            ["day", "দিন"],
            ["morning", "সকাল"],
            ["moment", "মুহূর্ত"],
            ["hour", "ঘণ্টা"],
          ],
          year: [
            ["year", "বছরে"],
            ["chapter", "অধ্যায়ে"],
            ["season", "ঋতুতে"],
            ["journey", "যাত্রায়"],
          ],
          celebration: [
            ["celebration", "উদযাপন"],
            ["festival", "উৎসব"],
            ["blessing", "আশীর্বাদ"],
            ["victory", "বিজয়"],
          ],
        },
      },
    ],
  },
  political: {
    emojis: ["🗣️", "🕊️", "⚖️", "📢", "🌍", "✊", "🤝", "🛡️", "📜", "🗳️"],
    statics: [
      ["A nation grows when its people think for themselves 🗣️", "জনগণ নিজেরা চিন্তা করলে জাতি এগিয়ে যায় 🗣️"],
      ["Peace is not the absence of conflict; it is the presence of justice ⚖️", "শান্তি মানে সংঘাতের অনুপস্থিতি নয়; এটা বিচারের উপস্থিতি ⚖️"],
      ["Democracy is not just voting; it is staying informed 🗳️", "গণতন্ত্র মানে শুধু ভোট দেওয়া নয়; সচেতন থাকা 🗳️"],
      ["Educate a nation, and you change its future 📜", "একটি জাতিকে শিক্ষিত করুন, আর তার ভবিষ্যৎ বদলে যাবে 📜"],
      ["Stand for something, or you will fall for anything ✊", "কোনো কিছুর পক্ষে দাঁড়ান, নয়তো যেকোনো কিছুর পেছনে পড়ে যাবেন ✊"],
      ["Justice delayed is justice denied ⚖️", "বিচার বিলম্বিত হলে তা বিচারহীনতায় পরিণত হয় ⚖️"],
      ["The voice of the people is the voice of progress 🗣️", "জনগণের কণ্ঠস্বরই অগ্রগতির কণ্ঠস্বর 🗣️"],
      ["Unity is not staying silent; it is speaking with one voice 🤝", "ঐক্য মানে নীরব থাকা নয়; এক কণ্ঠে কথা বলা 🤝"],
      ["A better world starts with an informed citizen 🌍", "একটি ভালো পৃথিবী শুরু হয় সচেতন নাগরিক দিয়ে 🌍"],
      ["Power without responsibility is chaos 📢", "দায়িত্বহীন ক্ষমতা বিশৃঙ্খলা 📢"],
      ["History judges nations by how they treat the weak 🕊️", "দুর্বলদের সাথে কেমন ব্যবহার, এটাই দেখে ইতিহাস জাতিকে বিচার করে 🕊️"],
      ["Think globally, act locally, care deeply 🌍", "বিশ্বকে ভাবুন, নিজের এলাকায় কাজ করুন, গভীরভাবে যত্ন নিন 🌍"],
    ],
    groups: [
      {
        en: "A {nation} is strong when its {people} are {quality} {e}",
        bn: "একটি {nationBn} শক্তিশালী হয়, যখন তার {peopleBn} {qualityBn} {e}",
        slots: {
          nation: [
            ["nation", "জাতি"],
            ["society", "সমাজ"],
            ["country", "দেশ"],
            ["community", "সম্প্রদায়"],
          ],
          people: [
            ["people", "জনগণ"],
            ["citizens", "নাগরিকরা"],
            ["youth", "তরুণরা"],
            ["workers", "শ্রমিকরা"],
          ],
          quality: [
            ["united", "একতাবদ্ধ"],
            ["educated", "শিক্ষিত"],
            ["aware", "সচেতন"],
            ["honest", "সৎ"],
            ["hopeful", "আশাবাদী"],
          ],
        },
      },
      {
        en: "The {change} begins with {who} {e}",
        bn: "{changeBn} শুরু হয় {whoBn} দিয়ে {e}",
        slots: {
          change: [
            ["change", "পরিবর্তন"],
            ["revolution", "বিপ্লব"],
            ["progress", "অগ্রগতি"],
            ["reform", "সংস্কার"],
          ],
          who: [
            ["you", "আপনার"],
            ["the youth", "তরুণদের"],
            ["education", "শিক্ষার"],
            ["awareness", "সচেতনতার"],
            ["the vote", "ভোটের"],
          ],
        },
      },
      {
        en: "Where there is no {justice}, there is no {peace} {e}",
        bn: "যেখানে {justiceBn} নেই, সেখানে {peaceBn} নেই {e}",
        slots: {
          justice: [
            ["justice", "বিচার"],
            ["truth", "সত্য"],
            ["equality", "সমতা"],
            ["freedom", "স্বাধীনতা"],
          ],
          peace: [
            ["peace", "শান্তি"],
            ["stability", "স্থিতিশীলতা"],
            ["harmony", "সদ্ভাব"],
            ["trust", "বিশ্বাস"],
          ],
        },
      },
      {
        en: "Do not just {complain}; {participate} {e}",
        bn: "শুধু {complainBn} নয়; {participateBn} {e}",
        slots: {
          complain: [
            ["complain", "অভিযোগ করুন"],
            ["criticize", "সমালোচনা করুন"],
            ["blame", "দোষারোপ করুন"],
            ["scroll", "স্ক্রল করুন"],
          ],
          participate: [
            ["participate", "অংশ নিন"],
            ["vote", "ভোট দিন"],
            ["speak up", "মুখ খুলুন"],
            ["volunteer", "সেচ্ছাসেবা করুন"],
            ["organize", "সংগঠিত করুন"],
            ["act", "কাজ করুন"],
          ],
        },
      },
      {
        en: "The {future} belongs to those who {prepare} for it {e}",
        bn: "{futureBn} তাদের, যারা এর জন্য {prepareBn} {e}",
        slots: {
          future: [
            ["future", "ভবিষ্যৎ"],
            ["tomorrow", "আগামীকাল"],
            ["next generation", "পরবর্তী প্রজন্ম"],
            ["nation", "জাতি"],
          ],
          prepare: [
            ["prepare", "প্রস্তুতি নেয়"],
            ["plan", "পরিকল্পনা করে"],
            ["fight", "লড়ে"],
            ["work", "কাজ করে"],
            ["hope", "আশা রাখে"],
          ],
        },
      },
      {
        en: "Speak {truth} to {power}, gently but firmly {e}",
        bn: "{powerBn}-কে সত্য কথা বলুন, নম্র কিন্তু দৃঢ়ভাবে {e}",
        slots: {
          truth: [
            ["truth", "সত্য"],
            ["honestly", "সত্য কথা"],
            ["with courage", "সাহস করে"],
          ],
          power: [
            ["power", "ক্ষমতাকে"],
            ["authority", "কর্তৃপক্ষকে"],
            ["the system", "ব্যবস্থাকে"],
            ["injustice", "অন্যায়কে"],
          ],
        },
      },
      {
        en: "A {vote} is a {voice} that cannot be {silenced} {e}",
        bn: "একটি {voteBn} হলো এমন একটি {voiceBn}, যাকে {silencedBn} যায় না {e}",
        slots: {
          vote: [
            ["vote", "ভোট"],
            ["protest", "প্রতিবাদ"],
            ["opinion", "মতামত"],
            ["pen", "কলম"],
          ],
          voice: [
            ["voice", "কণ্ঠস্বর"],
            ["seed", "বীজ"],
            ["weapon", "অস্ত্র"],
            ["power", "শক্তি"],
          ],
          silenced: [
            ["silenced", "নীরব করা"],
            ["taken away", "কেড়ে নেওয়া"],
            ["ignored", "উপেক্ষা করা"],
            ["bought", "কেনা"],
          ],
        },
      },
      {
        en: "Read {more}, assume {less}, understand {deeper} {e}",
        bn: "{moreBn} পড়ুন, {lessBn} ধরে নিন, {deeperBn} বুঝুন {e}",
        slots: {
          more: [
            ["more", "আরও"],
            ["widely", "বিস্তৃতভাবে"],
            ["critically", "সমালোচনামূলকভাবে"],
          ],
          less: [
            ["less", "কম"],
            ["rarely", "কদাচিৎ"],
            ["never", "কখনোই"],
          ],
          deeper: [
            ["deeper", "গভীরভাবে"],
            ["patiently", "ধৈর্যের সাথে"],
            ["kindly", "দয়ার সাথে"],
          ],
        },
      },
      {
        en: "Nations do not fall because of {enemies}; they fall because of {cause} {e}",
        bn: "জাতি {enemiesBn} কারণে পড়ে না; পড়ে {causeBn} কারণে {e}",
        slots: {
          enemies: [
            ["enemies", "শত্রুর"],
            ["outsiders", "বাইরের লোকের"],
          ],
          cause: [
            ["indifference", "উদাসীনতার"],
            ["corruption", "দুর্নীতির"],
            ["division", "বিভেদের"],
            ["ignorance", "অজ্ঞতার"],
            ["silence", "নীরবতার"],
          ],
        },
      },
      {
        en: "What cannot be {bought}, {what} cannot be {taken} {e}",
        bn: "যাকে {boughtBn} যায় না, {whatBn} {takenBn} যায় না {e}",
        slots: {
          bought: [
            ["bought", "কেনা"],
            ["silenced", "নীরব করা"],
            ["fooled", "বোকা বানানো"],
            ["scared", "ভয় দেখানো"],
          ],
          what: [
            ["hope", "আশা"],
            ["truth", "সত্য"],
            ["dignity", "মর্যাদা"],
            ["courage", "সাহস"],
          ],
          taken: [
            ["taken", "কেড়ে নেওয়া"],
            ["stolen", "চুরি করা"],
            ["erased", "মুছে ফেলা"],
            ["broken", "ভাঙা"],
          ],
        },
      },
    ],
  },
  foodie: {
    emojis: ["🍕", "🍔", "🍜", "🍰", "🥘", "🍩", "🍫", "🥐", "🍉", "☕"],
    statics: [
      ["Good food, good mood, good life 🍕", "ভালো খাবার, ভালো মেজাজ, ভালো জীবন 🍕"],
      ["I am on a seafood diet — I see food and I eat it 🍕", "আমি সি-ফুড ডায়েটে আছি — খাবার দেখলেই খাই 🍕"],
      ["Food is the way to my heart 🍔", "খাবারই আমার হৃদয়ের পথ 🍔"],
      ["Life is too short to skip dessert 🍰", "ডেজার্ট বাদ দেওয়ার জন্য জীবন খুব ছোট 🍰"],
      ["Calories do not count on weekends 🍩", "সাপ্তাহিক ছুটিতে ক্যালোরি গণনা হয় না 🍩"],
      ["The way to my heart is through my stomach 🥘", "আমার হৃদয়ের রাস্তা যায় আমার পেট দিয়ে 🥘"],
      ["Food tastes better when you eat it with people you love 🍜", "যাদের ভালোবাসেন তাদের সাথে খেলে খাবারের স্বাদ আরও বাড়ে 🍜"],
      ["A balanced diet is a cookie in each hand 🍫", "সুষম খাদ্য মানে দুই হাতে একটি করে কুকি 🍫"],
      ["I cook with love, and it shows 🥐", "আমি ভালোবাসা দিয়ে রান্না করি, আর তা দেখা যায় 🥐"],
      ["Midnight snacks taste like adventure 🍉", "মধ্যরাতের নাস্তার স্বাদ অভিযানের মতো 🍉"],
      ["Keep calm and eat more pizza 🍕", "শান্ত থাকুন এবং আরও পিৎজা খান 🍕"],
      ["Some people travel for sightseeing; I travel for food 🍜", "কেউ কেউ দর্শনের জন্য ভ্রমণ করে; আমি খাবারের জন্য ভ্রমণ করি 🍜"],
    ],
    groups: [
      {
        en: "I {feel} {best} when I eat {food} {e}",
        bn: "আমি {foodBn} খেলে সবচেয়ে {bestBn} {feelBn} {e}",
        slots: {
          feel: [
            ["feel", "বোধ করি"],
            ["am", "থাকি"],
            ["get", "হয়ে যাই"],
            ["become", "হয়ে যাই"],
          ],
          best: [
            ["happy", "খুশি"],
            ["alive", "জীবন্ত"],
            ["complete", "পরিপূর্ণ"],
            ["grateful", "কৃতজ্ঞ"],
          ],
          food: [
            ["pizza", "পিৎজা"],
            ["biryani", "বিরিয়ানি"],
            ["noodles", "নুডলস"],
            ["chocolate", "চকলেট"],
            ["ice cream", "আইসক্রিম"],
            ["pasta", "পাস্তা"],
          ],
        },
      },
      {
        en: "My {love} language is {food} {e}",
        bn: "আমার {loveBn} ভাষা হলো {foodBn} {e}",
        slots: {
          love: [
            ["love", "ভালোবাসার"],
            ["happiness", "সুখের"],
            ["kindness", "দয়ার"],
            ["affection", "স্নেহের"],
          ],
          food: [
            ["food", "খাবার"],
            ["biryani", "বিরিয়ানি"],
            ["dessert", "ডেজার্ট"],
            ["breakfast", "নাশতা"],
            ["street food", "স্ট্রিট ফুড"],
          ],
        },
      },
      {
        en: "There is no {problem} that {food} cannot {solve} {e}",
        bn: "এমন কোনো {problemBn} নেই, যা {foodBn} {solveBn} পারে না {e}",
        slots: {
          problem: [
            ["problem", "সমস্যা"],
            ["bad day", "খারাপ দিন"],
            ["sadness", "দুঃখ"],
            ["stress", "চাপ"],
          ],
          food: [
            ["hot tea", "গরম চা"],
            ["chocolate", "চকলেট"],
            ["good food", "ভালো খাবার"],
            ["a full plate", "এক প্লেট খাবার"],
            ["dessert", "ডেজার্ট"],
          ],
          solve: [
            ["solve", "সমাধান"],
            ["cure", "সারাতে"],
            ["fix", "ঠিক করতে"],
            ["heal", "আরাম দিতে"],
          ],
        },
      },
      {
        en: "{food} makes everything {better} {e}",
        bn: "{foodBn} সবকিছু {betterBn} করে তোলে {e}",
        slots: {
          food: [
            ["breakfast", "নাশতা"],
            ["coffee", "কফি"],
            ["street food", "স্ট্রিট ফুড"],
            ["home food", "ঘরের খাবার"],
            ["biryani", "বিরিয়ানি"],
            ["chai", "চা"],
          ],
          better: [
            ["better", "ভালো"],
            ["tastier", "সুস্বাদু"],
            ["brighter", "উজ্জ্বল"],
            ["easier", "সহজ"],
            ["sweeter", "মিষ্টি"],
          ],
        },
      },
      {
        en: "Cook with {ingredient} and eat with {feeling} {e}",
        bn: "{ingredientBn} দিয়ে রান্না করুন, {feelingBn} নিয়ে খান {e}",
        slots: {
          ingredient: [
            ["love", "ভালোবাসা"],
            ["patience", "ধৈর্য"],
            ["fresh herbs", "তাজা পাতা"],
            ["butter", "মাখন"],
            ["passion", "উদ্যম"],
          ],
          feeling: [
            ["gratitude", "কৃতজ্ঞতা"],
            ["joy", "আনন্দ"],
            ["family", "পরিবার"],
            ["friends", "বন্ধু"],
            ["memories", "স্মৃতি"],
          ],
        },
      },
      {
        en: "My stomach and I have an {agreement}: {rule} {e}",
        bn: "আমার পেট আর আমার একটি {agreementBn} আছে: {ruleBn} {e}",
        slots: {
          agreement: [
            ["agreement", "চুক্তি"],
            ["understanding", "বোঝাপড়া"],
            ["deal", "সমঝোতা"],
            ["rule", "নিয়ম"],
          ],
          rule: [
            ["never skip breakfast", "নাশতা বাদ দেওয়া যাবে না"],
            ["always save room for dessert", "ডেজার্টের জন্য জায়গা রাখতে হবে"],
            ["taste before you judge", "বিচারের আগে স্বাদ নাও"],
            ["share food kindly", "খাবার ভাগ করে খাও"],
          ],
        },
      },
      {
        en: "The first {bite} of the day decides the {mood} of the day {e}",
        bn: "দিনের প্রথম {biteBn} দিনের {moodBn} ঠিক করে {e}",
        slots: {
          bite: [
            ["bite", "কামড়"],
            ["sip", "চুমুক"],
            ["spoon", "চামচ"],
            ["meal", "খাবার"],
          ],
          mood: [
            ["mood", "মেজাজ"],
            ["energy", "শক্তি"],
            ["vibe", "মুড"],
            ["happiness", "আনন্দ"],
          ],
        },
      },
      {
        en: "Food is a {reason} to {celebrate} {e}",
        bn: "খাবার হলো {celebrateBn} করার {reasonBn} {e}",
        slots: {
          reason: [
            ["reason", "কারণ"],
            ["excuse", "অজুহাত"],
            ["occasion", "উপলক্ষ"],
            ["invitation", "দাওয়াত"],
          ],
          celebrate: [
            ["celebrate", "উদযাপন"],
            ["gather", "জমায়েত"],
            ["smile", "হাসার"],
            ["share", "ভাগ করার"],
          ],
        },
      },
      {
        en: "The best {meal} is the one shared with {people} {e}",
        bn: "সেরা {mealBn} হলো সেটাই, যা {peopleBn} সাথে ভাগ করা হয় {e}",
        slots: {
          meal: [
            ["meal", "খাবার"],
            ["dinner", "রাতের খাবার"],
            ["lunch", "দুপুরের খাবার"],
            ["breakfast", "নাশতা"],
            ["snacks", "নাস্তা"],
          ],
          people: [
            ["family", "পরিবারের"],
            ["friends", "বন্ধুদের"],
            ["loved ones", "প্রিয়জনদের"],
            ["good company", "ভালো সঙ্গীদের"],
          ],
        },
      },
      {
        en: "I eat my emotions with {food} {e}",
        bn: "আমি {foodBn} দিয়ে আবেগ খাই {e}",
        slots: {
          food: [
            ["extra biryani", "অতিরিক্ত বিরিয়ানি"],
            ["a tub of ice cream", "এক বালতি আইসক্রিম"],
            ["hot fries", "গরম ফ্রাই"],
            ["a whole pizza", "পুরো পিৎজা"],
            ["warm soup", "গরম স্যুপ"],
          ],
        },
      },
    ],
  },
  travel: {
    emojis: ["✈️", "🌍", "🗺️", "🧳", "🏔️", "🌄", "🚞", "⛰️", "🌊", "🏝️"],
    statics: [
      ["The world is a book, and those who do not travel read only one page 🌍", "পৃথিবী একটি বই, আর যারা ভ্রমণ করে না তারা শুধু একটি পৃষ্ঠাই পড়ে 🌍"],
      ["Not all those who wander are lost 🗺️", "যারা ঘুরে বেড়ায় তারা সবাই হারিয়ে যায় না 🗺️"],
      ["Travel makes one modest — you see what a tiny place you occupy in the world 🌍", "ভ্রমণ মানুষকে নম্র করে — পৃথিবীতে আপনার জায়গাটা কত ছোট তা দেখতে পান 🌍"],
      ["Adventure is worthwhile in itself 🏔️", "অভিযান নিজেই মূল্যবান 🏔️"],
      ["Pack your bags; the mountains are waiting 🧳", "ব্যাগ গোছান; পাহাড় অপেক্ষা করছে 🧳"],
      ["Take only photos, leave only footprints, keep only memories 🌄", "শুধু ছবি তুলুন, শুধু পদচিহ্ন রাখুন, শুধু স্মৃতি নিয়ে যান 🌄"],
      ["Wherever you go becomes a part of you somehow ✈️", "আপনি যেখানেই যান, তা কোনো না কোনোভাবে আপনার অংশ হয়ে যায় ✈️"],
      ["I have wanderlust, and my passport is my best friend 🗺️", "আমার ঘুরে বেড়ানোর নেশা আছে, আর আমার পাসপোর্ট আমার সেরা বন্ধু 🗺️"],
      ["The journey of a thousand miles begins with a single step 🚞", "হাজার মাইলের যাত্রা শুরু হয় একটি পদক্ষেপ দিয়ে 🚞"],
      ["Jet lag is temporary; the memories are forever ✈️", "জেট ল্যাগ সাময়িক; স্মৃতি চিরস্থায়ী ✈️"],
      ["Catch flights, not feelings 🏝️", "অনুভূতি নয়, ফ্লাইট ধরুন 🏝️"],
      ["Travel is the only thing you buy that makes you richer 🧳", "ভ্রমণই একমাত্র জিনিস যা কিনলে আপনি ধনী হন 🧳"],
    ],
    groups: [
      {
        en: "I travel to {place} to {find} {thing} {e}",
        bn: "আমি {placeBn} যাই {thingBn} {findBn} {e}",
        slots: {
          place: [
            ["the mountains", "পাহাড়ে"],
            ["the sea", "সমুদ্রে"],
            ["new cities", "নতুন শহরে"],
            ["quiet villages", "নীরব গ্রামে"],
            ["the desert", "মরুভূমিতে"],
            ["old towns", "পুরনো শহরে"],
          ],
          find: [
            ["find", "খুঁজতে"],
            ["chase", "অন্বেষণ করতে"],
            ["taste", "স্বাদ নিতে"],
            ["collect", "জমাতে"],
            ["breathe", "নিশ্বাস নিতে"],
          ],
          thing: [
            ["peace", "শান্তি"],
            ["adventure", "রোমাঞ্চ"],
            ["myself", "নিজেকে"],
            ["new flavors", "নতুন স্বাদ"],
            ["sunsets", "সূর্যাস্ত"],
            ["stories", "গল্প"],
          ],
        },
      },
      {
        en: "The best {lesson} is learned {where} {e}",
        bn: "সেরা {lessonBn} শেখা যায় {whereBn} {e}",
        slots: {
          lesson: [
            ["lesson", "শিক্ষা"],
            ["story", "গল্প"],
            ["memories", "স্মৃতি"],
            ["friendships", "বন্ধুত্ব"],
          ],
          where: [
            ["on the road", "পথে"],
            ["in the mountains", "পাহাড়ে"],
            ["beside the ocean", "সমুদ্রের ধারে"],
            ["in a foreign land", "বিদেশে"],
            ["under the stars", "তারার নিচে"],
          ],
        },
      },
      {
        en: "Pack your {bag} and leave your {worries} at home {e}",
        bn: "{bagBn} গোছান আর {worriesBn} বাড়িতেই রেখে যান {e}",
        slots: {
          bag: [
            ["bag", "ব্যাগ"],
            ["backpack", "ব্যাকপ্যাক"],
            ["suitcase", "স্যুটকেস"],
            ["heart", "হৃদয়"],
          ],
          worries: [
            ["worries", "চিন্তা"],
            ["doubts", "সন্দেহ"],
            ["routine", "রুটিন"],
            ["deadlines", "সময়সীমা"],
            ["fears", "ভয়"],
          ],
        },
      },
      {
        en: "{place} is calling, and I must {respond} {e}",
        bn: "{placeBn} ডাকছে, আর আমাকে {respondBn} {e}",
        slots: {
          place: [
            ["the ocean", "সমুদ্র"],
            ["the hills", "পাহাড়"],
            ["the train tracks", "রেললাইন"],
            ["the open road", "খোলা রাস্তা"],
            ["the sunset", "সূর্যাস্ত"],
            ["the horizon", "দিগন্ত"],
          ],
          respond: [
            ["respond", "সাড়া দিতে হবে"],
            ["go", "যেতেই হবে"],
            ["follow", "অনুসরণ করতে হবে"],
            ["listen", "শুনতে হবে"],
          ],
        },
      },
      {
        en: "I collect {thing} instead of {other} {e}",
        bn: "আমি {otherBn} নয়, {thingBn} সংগ্রহ করি {e}",
        slots: {
          thing: [
            ["memories", "স্মৃতি"],
            ["stamps", "স্ট্যাম্প"],
            ["stories", "গল্প"],
            ["photographs", "ছবি"],
            ["friendships", "বন্ধুত্ব"],
          ],
          other: [
            ["things", "জিনিস"],
            ["worries", "চিন্তা"],
            ["regrets", "অনুশোচনা"],
            ["stuff", "সামগ্রী"],
          ],
        },
      },
      {
        en: "The best {time} to travel is {when} {e}",
        bn: "ভ্রমণের সেরা {timeBn} হলো {whenBn} {e}",
        slots: {
          time: [
            ["time", "সময়"],
            ["season", "ঋতু"],
            ["moment", "মুহূর্ত"],
          ],
          when: [
            ["now", "এখন"],
            ["when you are ready", "যখন প্রস্তুত হবেন"],
            ["before it is too late", "দেরি হওয়ার আগে"],
            ["whenever you can", "যতবার পারেন"],
            ["with an open heart", "খোলা মনে"],
          ],
        },
      },
      {
        en: "Every {destination} has a {story} to {tell} {e}",
        bn: "প্রতিটি {destinationBn} {tellBn} মতো একটি {storyBn} আছে {e}",
        slots: {
          destination: [
            ["city", "শহরের"],
            ["village", "গ্রামের"],
            ["street", "রাস্তার"],
            ["market", "বাজারের"],
            ["island", "দ্বীপের"],
            ["station", "স্টেশনের"],
          ],
          story: [
            ["story", "গল্প"],
            ["secret", "গোপন"],
            ["lesson", "শিক্ষা"],
            ["history", "ইতিহাস"],
          ],
          tell: [
            ["tell", "বলে দেওয়ার"],
            ["share", "ভাগ করার"],
            ["teach", "শেখানোর"],
            ["remember", "মনে রাখার"],
          ],
        },
      },
      {
        en: "Traveling {opens} your {mind} to {thing} {e}",
        bn: "ভ্রমণ আপনার {mindBn} খুলে দেয় {thingBn} প্রতি {e}",
        slots: {
          opens: [
            ["opens", "খুলে দেয়"],
            ["broadens", "বিস্তৃত করে"],
            ["widens", "প্রশস্ত করে"],
            ["frees", "মুক্ত করে"],
          ],
          mind: [
            ["mind", "মন"],
            ["heart", "হৃদয়"],
            ["world", "জগৎ"],
            ["soul", "আত্মা"],
          ],
          thing: [
            ["new cultures", "নতুন সংস্কৃতির"],
            ["possibilities", "সম্ভাবনার"],
            ["kindness", "দয়ার"],
            ["beauty", "সৌন্দর্যের"],
          ],
        },
      },
      {
        en: "Some of the best {things} happen {where} {e}",
        bn: "সবচেয়ে ভালো কিছু {thingsBn} ঘটে {whereBn} {e}",
        slots: {
          things: [
            ["things", "জিনিস"],
            ["stories", "গল্প"],
            ["friendships", "বন্ধুত্ব"],
            ["meals", "খাবার"],
          ],
          where: [
            ["when you get lost", "হারিয়ে গেলে"],
            ["off the map", "মানচিত্রের বাইরে"],
            ["on detours", "ঘুরপথে"],
            ["with strangers", "অপরিচিতদের সাথে"],
          ],
        },
      },
      {
        en: "I do not know where I am {going}, but I am {enjoying} the {ride} {e}",
        bn: "আমি জানি না কোথায় {goingBn}, তবে {rideBn} {enjoyingBn} {e}",
        slots: {
          going: [
            ["going", "যাচ্ছি"],
            ["heading", "রওনা হয়েছি"],
            ["ending up", "পৌঁছাব"],
          ],
          enjoying: [
            ["enjoying", "উপভোগ করছি"],
            ["loving", "ভালোবাসছি"],
            ["living", "বাঁচছি"],
            ["savoring", "স্বাদ নিচ্ছি"],
          ],
          ride: [
            ["ride", "যাত্রাটা"],
            ["journey", "সফরটা"],
            ["moment", "মুহূর্তটা"],
            ["view", "দৃশ্যটা"],
          ],
        },
      },
    ],
  },
};

function resolve(template, slotMap) {
  return template.replace(/\{(\w+)\}/g, (_, key) => slotMap[key] ?? "");
}

function generateCategory(name, template, target) {
  const result = [];

  for (const [en, bn] of template.statics) {
    result.push({ category: name, text: { en, bn } });
  }

  const pool = new Set();
  const MAX_ATTEMPTS = 6000;
  for (let i = 0; i < MAX_ATTEMPTS && pool.size < target; i++) {
    const group = pick(template.groups);
    const slotMap = {};
    for (const [slotName, options] of Object.entries(group.slots)) {
      const opt = pick(options);
      slotMap[slotName] = opt[0];
      slotMap[`${slotName}Bn`] = opt[1];
    }
    const en = resolve(group.en, slotMap).replace(/\s+/g, " ").trim();
    const bn = resolve(group.bn, slotMap).replace(/\s+/g, " ").trim();
    pool.add(JSON.stringify({ en, bn }));
  }

  for (const item of pool) {
    const { en, bn } = JSON.parse(item);
    const emoji = sampleEmojis(template.emojis);
    result.push({ category: name, text: { en: `${en} ${emoji}`.trim(), bn: `${bn} ${emoji}`.trim() } });
  }
  return shuffle(result).slice(0, target);
}const all = [];
const report = {};
for (const [name, template] of Object.entries(T)) {
  const items = generateCategory(name, template, TARGET_PER_CATEGORY);
  report[name] = items.length;
  all.push(...items);
}

const statuses = all.map((s, i) => ({ id: i + 1, ...s }));

const file = `// AUTO-GENERATED by scripts/generate-statuses.mjs — DO NOT EDIT BY HAND.
// Run \`node scripts/generate-statuses.mjs\` to regenerate.

export const statuses = [
${statuses.map((s) => `  ${JSON.stringify(s)}`).join(",\n")}
];
`;

const outPath = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "statuses.js");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, file, "utf8");

console.log("Per category:", report);
console.log("Total statuses:", statuses.length);
