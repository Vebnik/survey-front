import { ChangeEventHandler, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { questionsData } from "./assets/questions";

import DefaultLayout from "@/layouts/default";

type SatateType = React.Dispatch<React.SetStateAction<number>>;

export interface Variant {
  text: string;
}

export interface Question {
  text: string;
  before: Variant[];
  after: Variant[];
}

function TitleQuestion({
  page,
  setPage,
}: {
  page: number;
  setPage: SatateType;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(true);

  const onChange = (text: string) => {
    const dates = text.split(",");

    if (dates.length === 1 && dates[0].length > 10) {
      setIsInvalid(true);
      setValue(text);

      return;
    }

    if (
      dates
        .map((el) => {
          const first = /\d\d\.\d\d\.\d\d\d\d/gim.test(el);
          const nums = el.split(".").map(Number);
          const second =
            nums[0] <= 31 && nums[1] <= 12 && nums[0] > 0 && nums[1] >= 1;

          return first && second;
        })
        .every((el) => el)
    ) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }

    setValue(text);
  };

  return (
    <Card className="rounded-md bg-bismark-100 fade-in w-[100%] min-h-[100%] max-w-[800px]">
      <CardHeader>Вопрос: {page}</CardHeader>
      <CardBody>
        <div className="my-4">
          Укажите, пожалуйста, в каком году была проведена операция по замене
          тазобедренного сустава (если их несколько, запишите годы через
          запятую).
        </div>
        <Input
          errorMessage="Неправильный формат даты ( Пример: дд.мм.гггг )"
          isInvalid={isInvalid}
          label="Год операции"
          placeholder="01.12.1998, 02.12.1998"
          value={value}
          variant="flat"
          onChange={(ev) => onChange(ev.target.value)}
        />
        <div className="my-4">
          Просим Вас сравнить ваши физические возможности и эмоциональное
          состояние{" "}
          <span className="font-bold">до и после проведения операции</span>. Для
          этого
          <span className="font-bold">
            {" "}
            поставьте галочки в ячейках таблицы{" "}
          </span>
          рядом с пунктами, которые соответствуют Вашей оценке.
        </div>
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        <Button
          className="bg-bismark-300"
          isDisabled={!Boolean(value) || isInvalid}
          variant="flat"
          onPress={() => setPage(page + 1)}
        >
          Далее
        </Button>
        <Button
          className="bg-red-200"
          variant="flat"
          onPress={() => navigate("/")}
        >
          Назад
        </Button>
      </CardFooter>
    </Card>
  );
}

function NextQuestion({
  page,
  setPage,
  question,
}: {
  page: number;
  setPage: SatateType;
  question: Question;
}) {
  return (
    <Card className="rounded-md bg-bismark-100 fade-in w-[100%] min-h-[100%] max-w-[800px]">
      <CardHeader>Вопрос: {page}</CardHeader>
      <CardHeader className="font-bold">{question.text}</CardHeader>
      <CardBody>{question.text}</CardBody>
      <CardFooter className="flex flex-row justify-between">
        <Button
          className="bg-bismark-300"
          variant="flat"
          onPress={() => setPage(page + 1)}
        >
          Далее
        </Button>
        <Button
          className="bg-red-200"
          variant="flat"
          onPress={() => setPage(page - 1)}
        >
          Назад
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SurveyPage() {
  const [page, setPage] = useState<number>(
    Number(localStorage.getItem("page") || 1),
  );
  const [questions] = useState<Question[]>(questionsData);
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    setQuestion(questions[page - 1]);
    localStorage.setItem("page", `${page}`);
  }, [page]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
        {!(page > 1) ? (
          <TitleQuestion page={page} setPage={setPage} />
        ) : question ? (
          <NextQuestion
            key={page}
            page={page}
            question={question!}
            setPage={setPage}
          />
        ) : (
          <></>
        )}
      </section>
    </DefaultLayout>
  );
}
