const LETTER_EN = `Hello, friend—

I am surprised, and genuinely glad, that someone in the world found my secret base and read the subtext I never said aloud. Whether you are a friend, HR, an admissions officer, or a stranger from far away: nice to meet you.

After my site, I do not know what you feel inside. Maybe you think I am all form and no substance. Maybe you laugh at how lofty and impractical I sound… Either way, you might be right.

So I want to stop.

Next to computer science, next to grand ambition, I would rather be a free wanderer moving through a wide sky. I want to pause—or change the scenery entirely.

But the world around me rarely leaves room to breathe or stand still. I want to find out what I actually love. Set aside “high pay” and the fast lane; even if I ended up homeless, I would still want to live inside what I care about. Short videos may have poured too much into all of us. Few people sit down and ask what they really need. More than fame or success, that is the future I want to explore.`;

const LETTER_ZH = `亲爱的朋友你好：
我很惊讶、也很欣喜原来世界上真的有一个人探索到了我的秘密基地，读懂了我没有言说的潜台词。所以，无论你是我的朋友、HR、招生官、或是来自远方的陌生人，很高兴遇见你。
看完我的个人网页，不知道你内心是否有着别样的感受：或许，你会觉得我是一个形式主义的水货；或许你会嘲笑我的好高骛远、不切实际... 无论如何，我想或许你是正确的。
所以，我想停下。
相比于我的专业计算机、相比于鸿鹄壮志，我更想当一个无拘无束的行者，去穿梭在广袤无垠的天际。我很想停下，或者是换个环境生活。
可是，现在的社会环境却不给我喘息、停滞的机会。我想探索一下，我喜欢的终究是什么。抛弃所谓的高薪与快节奏，即便成为流浪汉，我也想活在热爱中。可能，当今时代的短视频灌输了我们太多。很少有人可以沉下心来，想想自己需要的究竟是什么了，比起功成名就，这才是我想探寻的未来。`;

const DIVIDER = "——";

export function logConsoleLetter() {
  if (typeof window === "undefined") return;
  console.log(
    `%c${LETTER_EN}\n\n${DIVIDER}\n\n${LETTER_ZH}`,
    "font-size: 13px; line-height: 1.55; color: #d7e2ea;",
  );
}
