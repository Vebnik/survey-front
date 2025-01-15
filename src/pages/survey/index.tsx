import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

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
  return (
    <Card className="rounded-md bg-bismark-100 scale-in-center">
      <CardHeader>Вопрос: {page}</CardHeader>
      <CardBody>CardBody</CardBody>
      <CardFooter>
        <Button
          className="bg-bismark-300"
          variant="flat"
          onPress={() => setPage(page + 1)}
        >
          Далее
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
    <Card className="rounded-md bg-bismark-100 fade-in">
      <CardHeader>Вопрос: {page}</CardHeader>
      <CardBody>{question.text}</CardBody>
      <CardFooter>
        <Button
          className="bg-bismark-300"
          variant="flat"
          onPress={() => setPage(page + 1)}
        >
          Далее
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SurveyPage() {
  const [questions] = useState<Question[]>(questionsData);
  const [question, setQuestion] = useState<Question>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setQuestion(questions[page - 1]);
  }, [page]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {!(page > 1) ? (
          <TitleQuestion page={page} setPage={setPage} />
        ) : (
          <NextQuestion
            key={page}
            page={page}
            question={question!}
            setPage={setPage}
          />
        )}
      </section>
    </DefaultLayout>
  );
}
