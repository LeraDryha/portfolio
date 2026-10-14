# Portfolio: бриф проєкту

Сайт-портфоліо Valeriia (Lera) Dryha. Він замінює портфоліо, яке зараз лежить у Notion:
https://app.notion.com/p/Hi-I-m-Lera-13b44bdcbfce80dfba23e68b5324093f

## Як працювати з власницею

- Lera — продуктова дизайнерка, не технічна людина: код не читає й не пише. Весь код пише Claude у ролі product design engineer.
- Це не навчальний проєкт. Не пояснюй код і не перетворюй роботу на уроки. Звітуй про результат мовою дизайну й продукту.
- Питай Lera лише про продуктові та дизайнерські рішення. Технічні рішення приймай сам і коротко пояснюй, що вони дають.
- Спілкування українською. Мова сайту — англійська.

## Мета й аудиторія

- **Аудиторія:** роботодавці (рекрутери, hiring managers).
- **Мета:** сайт має виглядати солідно й підкреслювати сильні сторони. Головне — показати кейси, а контакти й CV другорядні.
- **Посади:** Product Designer і Product Design Engineer.
- **Підпис на сайті:** поки «Product Designer».

## Контент

### Головні кейси

Тексти й зображення в Notion готові до публікації.

1. **Comfy: UX Case Study** (2024). Кредитне оформлення замовлення, частка зросла з 30% до 40%, команда з 4 дизайнерів.
   https://app.notion.com/p/Comfy-UX-Case-Study-23a9d4c6be1c4d28abaeb971a83b0e43
2. **Solutions for Adtelligent (AdTech B2B SaaS platform)** (2025). У Notion не заповнені «Role» і «Skills», їх треба додати разом з Lera.
   https://app.notion.com/p/Solutions-for-Adtelligent-AdTech-B2B-SaaS-platform-26d44bdcbfce8057b34ecc668599d5f2
3. **From Transaction Log to Smart Financial Assistant** (2024). Фінтех для ринку США, утримання користувачів після підключення банку. У Notion не заповнені «Focus» і «Skills».
   https://app.notion.com/p/From-Transaction-Log-to-Smart-Financial-Assistant-24244bdcbfce8040876dfe857d29eb36
4. **GRX Design System.** Великий кейс з купою специфікацій, у Notion його немає, лише у Figma:
   https://www.figma.com/design/r3E5XdifyoiiNeuj7mOjBk/GRX-Design-System-%F0%9F%9A%A8?node-id=417-706
   Як подати кейс, вирішимо після того, як оцінимо масштаб файлу. Для цієї дизайн-системи окремо робимо з нуля Storybook на PrimeReact (див. «Пов'язані проєкти»).

### Prevently — особистий продукт, окремий акцент

Lera зробила продукт сама, від ідеї до релізу. Для посади Product Design Engineer це найсильніша історія. На головній це велика картка кейсу в сітці, поруч із меншими картками інших кейсів. Окремого блоку під нього немає.
- Сайт: https://preventlyapp.com
- App Store: https://apps.apple.com/ua/app/prevently-%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-%D0%BE%D0%B1%D1%81%D1%82%D0%B5%D0%B6%D0%B5%D0%BD%D1%8C/id6789842262
- Google Play: застосунок на розгляді, посилання додамо, коли опублікують.
- Репозиторії: LeraDryha/prevently-ios, prevently-android, prevently-store, prevently2.

### Інші кейси

На головній вони приховані й відкриваються кнопкою на кшталт «More work».
- Task Creation Reimagined (2025): https://app.notion.com/p/Task-Creation-Reimagined-22f44bdcbfce803b8820ff2f98222f09
- Onboarding through Hypotheses & A/B Testing (2025, концепт): https://app.notion.com/p/Onboarding-through-Hypotheses-A-B-Testing-26e44bdcbfce8067a499f30c9ae13e82
- Mental health MVP (2023): https://app.notion.com/p/Case-Study-ce5fb0f537104a5eb7d2346460588691
- Dnipropetrovsk Regional Center for Educational Quality Assessment (майже без тексту): https://app.notion.com/p/Dnipropetrovsk-Regional-Center-for-Educational-Quality-Assessment-13b44bdcbfce8050b01ecb958ac85f3b

### Статті (Writing)

Окремий розділ. Статті українською, тому на англомовному сайті позначаємо мову.
- «Місце, де UX помер»: https://medium.com/@dynya.90/місце-де-ux-помер-0227edc2c2b7
- «Hand-off без сліз: як не стати єдиним хранителем знань у команді»: https://medium.com/@dynya.90/hand-off-без-сліз-як-не-стати-єдиним-хранителем-знань-у-команді-415ebc85b2c9

### Контакти

- Email: dryga_v@yahoo.com
- LinkedIn: https://www.linkedin.com/in/valeriia-dryha-37b083247/
- Телефон: Lera його дала. Чи показувати його на сайті, ще не вирішено, тому в репозиторій його не записуємо: репозиторій публічний.
- CV: Lera додасть пізніше.

### Сторінки

- **Home:** hero, сітка головних кейсів (Prevently — велика картка), «More work», Writing, контакти.
- **Сторінка кейсу:** `/work/<slug>`, один шаблон для всіх кейсів.
- **About:** про Lera й контакти.

## Дизайн

**Продуктова правда (аудиторія, позиціонування, докази, обмеження) — `PRODUCT.md`. Джерело правди для всього візуального — `DESIGN.md`** (токени, типографіка, компоненти, правила). Будь-який новий екран чи компонент спершу звіряємо з ним. Якщо рішення суперечить `DESIGN.md`, питаємо Lera й оновлюємо `DESIGN.md`, а не обходимо його.

- Творчий орієнтир: **«The Proof Sheet»** — кожен кейс показуємо однією справжньою деталлю з кейсу, без картинок.
- Обрано: один акцент (**Mulberry Ink**), заголовки Geist, курсив Newsreader для меню, підписів і цитат.
- Проєктуємо одразу в коді, без макетів у Figma. Еталонний концепт головної: `docs/concept/portfolio-concept.html` (живий: https://claude.ai/artifact/UXTrEBiWLrvCXGHcLK4Sro).
- Еталонний концепт сторінки кейсу (на Comfy): `docs/concept/case-comfy.html` (живий: https://claude.ai/artifact/WfTmvosY6mafSZBFwcsHr8). Структура: спершу підсумок, далі історія з навігацією-діамантом (Double Diamond). Бриф і контракт напряму: `.impeccable/surfaces/docs-concept-case-comfy-html.md`.
- Історія рішень і референси: `docs/references.md`. Машинний опис дизайн-системи для Impeccable: `.impeccable/design.json`.
- Для дизайн-рішень і перевірок використовуємо скіл Impeccable (critique, polish, audit тощо).
- **Російська й білоруська заборонені завжди**, зокрема в привітанні.

## Технічне

- Next.js (App Router) і TypeScript.
- Хостинг — Vercel. Зараз на GitHub Pages висить тимчасова заглушка, `.github/workflows/deploy.yml` прибираємо після переїзду на Vercel.
- Контент живе в репозиторії як MDX. Зображення з Notion переносимо в репозиторій.
- Аналітика — найпростіший варіант, Vercel Web Analytics.
- Репозиторій: https://github.com/LeraDryha/portfolio (публічний). Не комітимо приватних даних.

## Структура репозиторію

```
app/                    сторінки (App Router): layout, головна, about/, work/[slug]/
components/ui/          дрібні компоненти: Button, Tag, ThemeToggle…
components/sections/    великі блоки сторінок: Hero, CaseGrid, Writing…
content/work/           кейси, по MDX-файлу на кейс
content/site.ts         контакти, статті, підпис та інші дані, що не є кейсами
public/work/<slug>/     зображення кейсу
public/cv.pdf           CV (коли з'явиться)
styles/                 дизайн-токени й теми (світла/темна)
lib/                    технічні помічники (читання MDX тощо)
docs/references.md      візуальні референси: лише посилання й нотатки
docs/concept/           еталонні HTML-концепти: головна і сторінка кейсу
ui/inventory.md         інвентар компонентів: що повторюється, що разове, що ще знадобиться
DESIGN.md               дизайн-система (джерело правди для візуалу)
PRODUCT.md              продукт: для кого сайт, що доводить, які докази є
```

Без папки `src/`. Файли `.gitkeep` прибираємо, коли в папці з'являється справжній вміст.

## Пов'язані проєкти

- **Storybook для GRX Design System** на PrimeReact, з нуля. Пропозиція: окремий репозиторій і окремий деплой, а кейс у портфоліо посилається на нього.

## Відкриті питання

- Яка головна дія відвідувача (CTA)? Треба дослідити.
- Візуальні референси й напрям.
- Як подати кейс GRX Design System, коли оцінимо масштаб Figma-файлу.
- Чи показувати телефон на сайті?
- CV у PDF.
- Інші кейси: повноцінні сторінки чи короткі картки?
- Посилання на Google Play для Prevently.
