import { Button } from "@/shared/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col py-14 p-8 container max-w-[900px]">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Micro courses - изучай только нужное
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Ищи нужные микро курсы на карте. Составляй роадмап. Отслеживай свой
        прогресс.
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 mt-5">
        <li>
          <b>Здесь можно платить только за нужную информациию</b>
        </li>
        <li>
          <b>Здесь легко найти то, что нужно тебе</b>
        </li>
        <li>
          <b>Здесь всегда понятно, что учить дальше</b>
        </li>
      </ul>

      <Button asChild className="mt-10" variant={"rainbow"}>
        <Link href="/map">Посмотреть карту</Link>
      </Button>

      <h2 className="mt-20 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Моя миссия
      </h2>

      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Привет! Меня зовут Евгений Паромов. Я Front-end разработчик с 5 летним
        опытом. Я обожаю развиваться и учиться новому. Но есть проблема...
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <b>Вся индустрия IT образования сосредоточена на новичках.</b> Как
        развиваться опытным разработчикам, вообще не понятно.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        У нас мало времени, чтобы проходить огромные курсы. У нас слишком разные
        знания, чтобы универсальная программа была полезной. Я готов заплатить
        деньги за узкие знания.{" "}
        <i>
          Но, пожалуйста, не заставляйте меня 2-5 часов сидеть на очередном
          вебинаре. И проходить кучу месячные курсы.
        </i>
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Но и авторам делать курсы для опытных не выгодно. Маленькая аудитория,
        сложность разработки и низкие чеки. Чтобы продавать, нужно обязательно
        быть блогером.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <b>
          Так и получается. Либо ты делаешь контент для новичков, либо идёшь
          лесом.
        </b>
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Я столкнулся с обоими этими проблемами. И захотел их решить. Захотел
        создать место, в котором выгодно:
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2 ">
        <li>авторам - обучать самым глубоким темам программирования</li>
        <li>ученикам - осваивать самые глубокие темы программирования</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <b>И приглашаю вас поучаствовать в этом процессе со мной.</b> <br />
        Если хотите стать автором - напишите{" "}
        <a
          className="font-medium text-primary underline underline-offset-4"
          href="https://t.me/paromovevg"
        >
          мне
        </a>{" "}
        <br />
        Если хотите учиться - нажимайте на большую радужную кнопку
      </p>
      <Button asChild className="mt-10" variant={"rainbow"}>
        <Link href="/map">Посмотреть карту</Link>
      </Button>
    </main>
  );
}
