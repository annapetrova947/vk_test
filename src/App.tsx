import { useState, useEffect } from "react";
import { Filters, Group } from "./types";
import { Groups } from "./components/Groups/Groups.tsx";
import { JsonGroupsMockSource } from "./data/source.ts";
import { Filter } from "./components/Filter/Filter.tsx";
import Preloader from "./components/Preloader/Preloader.tsx";

export default function App() {
  // Переменная, содержащая все группы
  const [groupsResponse, setGroupsResponse] = useState<Group[]>();
  // Переменная, содержащая отфильтрованные группы
  const [currentGroups, setCurrentGroups] = useState<Group[]>();
  // Переменная, содержащая фильтры
  const [filters, setFilters] = useState<Filters>({
    closed: null,
    color: null,
    friends: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    new JsonGroupsMockSource()
      .getJsonGroups()
      .then((res) => {
        if (res.result === 1 && "data" in res) {
          setIsLoading(false);
          setGroupsResponse(res.data);
          setCurrentGroups(res.data);
        } else {
          setIsLoading(false);
          setError("Сервер не вернул данные");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  useEffect(() => {
    // Фильтруются группы при изменении списка фильтров
    if (groupsResponse !== undefined) {
      const filteredArray: Array<Group> = groupsResponse.filter((item) =>
        Object.keys(filters).every((key) =>
          // Фильтр происходит по всем свойставм и методам объекта, содержащий фильтры
          // если значение у какого-либо метода null, фильтр по данному ключу не происходит
          filters[key as keyof typeof filters] === null || filters[key as keyof typeof filters] === "null"
            ? true
            : key === "friends"
              ? String(Boolean(item[key])) === String(filters[key])
              : String(item[key as keyof typeof item]) === String(filters[key as keyof typeof filters]),
        ),
      );

      setCurrentGroups(filteredArray);
    }
  }, [filters]);

  function handleFilter(field: string, value: string | boolean | null) {
    setFilters({ ...filters, [field]: value });
  }

  if (isLoading) return <Preloader />;
  else if (error !== "" || groupsResponse == undefined) {
    return <p>{error}</p>;
  } else
    return (
      <>
        <Filter
          label="Приватность"
          options={[
            { label: "все", value: "null" },
            { label: "Открытая", value: "false" },
            { label: "Закрытая", value: "true" }
          ]}
          filterBy="closed"
          onChange={handleFilter}
        />

        <Filter
          label="Цвет"
          options={
            // Создаем объект из доступный цветов для выбора
            groupsResponse!
            .map(function (item) {
              if (item['avatar_color'] !== undefined) return item['avatar_color'];
            })
            .filter((color) => color !== undefined)
            .reduce(
              (acc, item) => {
                acc.push({ label: String(item), value: String(item) });
                return acc;
              },
              [{ label: "все", value: "null" }],
            )}
          filterBy="avatar_color"
          onChange={handleFilter}
        />

        <Filter
          label="Друзья"
          options={[
            { label: "Все группы", value: "null" },
            { label: "Только где состоят друзья", value: "true" },
 
          ]}
          filterBy="friends"
          onChange={handleFilter}
        />
        <Groups groups={currentGroups} />
      </>
    );
}
