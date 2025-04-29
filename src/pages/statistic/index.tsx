import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DateRangePicker,
  RangeValue,
  DateValue,
} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import { useQuestion } from "@/store/question.store";
import { useState } from "react";

export default function StatisticPage() {
  const [date, setDate] = useState<RangeValue<DateValue>>();

  const que = useQuestion();

  const onStatistic = () => {
    if (!date) return;

    const from = date?.start.toString().replace(/-/gmi, '.').split('.')
    const to = date?.end.toString().replace(/-/gmi, '.').split('.')

    console.log({ from })

    const clearDate = {
      from: `${from[2]}.${from[1]}.${from[0]}`,
      to: `${to[2]}.${to[1]}.${to[0]}`,
    };

    que.getStatistic(clearDate);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 scale-in-center">
        <Card className="rounded-md bg-bismark-100 fade-in w-[100%] max-w-[800px]">
          <CardHeader>Статистика</CardHeader>
          <CardBody>
            <DateRangePicker
              onChange={(value) => setDate(value!)}
              value={date}
              label="Диапазон дат"
            />
          </CardBody>
          <CardFooter>
            <Button className="bg-bismark-300" onPress={onStatistic} isLoading={que.loading}>
              Сгенерировать отчёт
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
}
