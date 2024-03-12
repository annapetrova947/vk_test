import "./style.css";

export function Error(props: {error:string}) {
  
  return (
    <div className="error">
      <p className="error__name">{props.error}</p>
      <p className="error__description">Это симуляция ошибки с backend. Перезагрузите страницу</p>

    </div>
  );
}