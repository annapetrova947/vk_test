import { useState, useEffect } from "react";
import { Filters, Group, Option } from "./types";
import { Groups } from "./components/Groups/Groups.tsx";
import { JsonGroupsMockSource } from "./data/source.ts";
import { Filter } from "./components/Filter/Filter.tsx";
import { Error } from "./components/Error/Error.tsx";
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
    return <Error error={error}/>

    
  } else {
     // Создаем объект из доступный цветов для выбора
    let colorSet: Set<string | undefined> = new Set(groupsResponse
      .map(function (item) {
        return item['avatar_color'];
      }))
      
    colorSet.delete(undefined)
    const colorsOptions: Array<Option>  = [...colorSet].reduce(
        (acc, item) => {
          acc.push({ label: String(item), value: String(item) });
          return acc;
        },
        [{ label: "все", value: "null" }],
      )

    const closedOptions: Array<Option> = [
      { label: "все", value: "null" },
      { label: "Открытая", value: "false" },
      { label: "Закрытая", value: "true" }
    ]

    const friensOptions: Array<Option> = [
      { label: "Все группы", value: "null" },
      { label: "Только где состоят друзья", value: "true" },

    ]
  
    return (
      <>
        <Filter
          label="Приватность"
          options={closedOptions}
          filterBy="closed"
          onChange={handleFilter}
        />

        <Filter
          label="Цвет"
          options={
            colorsOptions
            }
          filterBy="avatar_color"
          onChange={handleFilter}
        />

        <Filter
          label="Друзья"
          options={friensOptions}
          filterBy="friends"
          onChange={handleFilter}
        />
        <Groups groups={currentGroups} />
      </>
    );
        }
}
