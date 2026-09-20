export const CURRENCY_README_MARKDOWN = `# Project introduction
This is a web page that queries real-time exchange rate conversion through the call api. 
<br>The user can select the country and the amount of the query, and the page will output the query result.

# User instruction
The mini-project is mainly composed of three pages: **light query page**, **dark query page** and **historical query record**.
From the navigation bar, you can select a page to access.
   Comparison      |       Light Mode                                        |       Dark Mode
--------------     | ----------------------                       | ------------------
Country selection  | SELECT from the options                                 |    TYPE your choice (Enter the first letter of the country to automatically associate the country that can be queried.)
  Plot             | Dynamically generated according to the selected country |Static rotation chart showing common country exchange rate movements
   Audio           |Read what the mouse clicks on| Click anywhere on the page to play background music

***

In addition, the query page also has the following functions.
* After the country is selected, the corresponding flag changes.
* Quick query of common exchange rates.
* Feedback on incorrect queries. (eg, In Dark Mode, if the entered country is not exist, and the query will not allowed.)

***

 
 * **Historical query record**
<br>The query records that record the user history, note, do not contain the results of quick queries`;

export const CURRENCY_SPECIAL_THOUGHTS = `Most projects on this site only show a short demo video. For this one I wanted space for why I built it. Unlike many of my later projects, this site does not use AI.

I made it in the first semester of sophomore year for a summer-program selection. The brief was a currency exchange website. I spent about two months learning HTML, CSS, and JavaScript from scratch, then built the site.

I keep it here on purpose. AI is useful for speed, but I still think you need the basics first. Skipping fundamentals and jumping straight into AI tools is a habit I do not want.

The site itself is simple: no fancy frameworks, and some features are just basic pieces stacked together without a sharp user target. That is fine. It marks where I started in CS, so it stays.`;
