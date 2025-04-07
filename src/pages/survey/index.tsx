import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { Question, useQuestion } from "@/store/question.store";

export interface Answer {
  questionId: number;
  after: null | string;
  before: null | string;
}

function TitleQuestion() {
  const [value, setValue] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(true);

  const navigate = useNavigate();
  const que = useQuestion();

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
        <Button className="bg-red-200" onPress={() => navigate("/")}>
          Назад
        </Button>
        <Button
          className="bg-bismark-300"
          isDisabled={!Boolean(value) || isInvalid}
          onPress={() => {
            que.setDate(value);
            que.setPage(que.page + 1);
          }}
        >
          Далее
        </Button>
      </CardFooter>
    </Card>
  );
}

function EndQuestion() {
  const que = useQuestion();

  return (
    <Card className="rounded-md bg-bismark-100 fade-in w-[100%] max-w-[800px]">
      <CardHeader className="font-semibold justify-center">
        <span>Удовлетворены ли Вы в целом результатами операции?</span>
      </CardHeader>
      <CardBody className="flex flex-row justify-center">
        <RadioGroup
          classNames={{ wrapper: "flex flex-row" }}
          // @ts-ignore
          onValueChange={(value) => que.setSatisfied(value)}
        >
          {["Да", "Частично", "Нет"].map((el) => (
            <Radio key={Math.random()} value={el}>
              {el}
            </Radio>
          ))}
        </RadioGroup>
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        <Button
          className="bg-red-200"
          onPress={() => que.setPage(que.page - 1)}
        >
          Назад
        </Button>
        <Button
          className="bg-bismark-300"
          onPress={() => que.setPage(que.page + 1)}
        >
          Далее
        </Button>
      </CardFooter>
    </Card>
  );
}

function SubmitForm() {
  const que = useQuestion();
  const navigate = useNavigate();

  const onSubmit = () => {
    que.submit().then(() => {
      que.clear();
      navigate("/");
    });
  };

  return (
    <Card className="rounded-md bg-bismark-100 fade-in w-[100%] max-w-[800px]">
      <CardHeader className="font-semibold justify-center">
        <span>Благодарим Вас за помощь в исследовании!</span>
      </CardHeader>
      <CardBody className="flex flex-row justify-center">
        <Button
          className="bg-bismark-300 max-w-max"
          // isLoading={que.loading}
          onPress={onSubmit}
        >
          Отправить
        </Button>
      </CardBody>
    </Card>
  );
}

function QuestionForm({ question }: { question: Question }) {
  const que = useQuestion();

  const onSelect = (
    text: string,
    // eslint-disable-next-line prettier/prettier
    answerType: "before_surgery" | "after_six_months"
  ) => {
    const index = que.completed.findIndex((el) => el.id === question.id);

    if (index === -1) return;

    que.updateCompleted(index, answerType, text);
  };

  return (
    <Card className="bg-transparent shadow-none">
      <CardHeader className="font-semibold">{question.question}</CardHeader>
      <CardBody className="flex flex-row justify-around">
        <RadioGroup
          label="До"
          onChange={(ev) => onSelect(ev.target.value, "before_surgery")}
        >
          {question.answers.before_surgery.map((el) => (
            <Radio key={Math.random()} value={el}>
              {el}
            </Radio>
          ))}
        </RadioGroup>
        <Divider orientation="vertical" />
        <RadioGroup
          label="После"
          onChange={(ev) => onSelect(ev.target.value, "after_six_months")}
        >
          {question.answers.after_six_months.map((el) => (
            <Radio key={Math.random()} value={el}>
              {el}
            </Radio>
          ))}
        </RadioGroup>
      </CardBody>
    </Card>
  );
}

function NextQuestion({ question }: { question: Question }) {
  const que = useQuestion();

  return (
    <Card className="rounded-md bg-bismark-100 fade-in w-[100%] min-h-[100%] max-w-[800px]">
      <CardHeader className="font-bold">Вопрос: {que.page}</CardHeader>
      <CardBody>
        <QuestionForm question={question} />
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        <Button
          className="bg-red-200"
          onPress={() => que.setPage(que.page - 1)}
        >
          Назад
        </Button>
        <Button
          className="bg-bismark-300"
          onPress={() => que.setPage(que.page + 1)}
        >
          Далее
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SurveyPage() {
  const que = useQuestion();

  if (que.page === -1)
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
          <TitleQuestion />
        </section>
      </DefaultLayout>
    );

  if (que.page > -1 && que.page < que.pages)
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
          <NextQuestion key={que.page} question={que.questions[que.page]} />
        </section>
      </DefaultLayout>
    );

  if (que.page === que.pages)
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
          <EndQuestion />
        </section>
      </DefaultLayout>
    );

  if (que.satisfied)
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
          <SubmitForm />
        </section>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
        <Spinner />
      </section>
    </DefaultLayout>
  );
}
