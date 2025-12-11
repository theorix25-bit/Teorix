//
// ----------------------------------------
// SELECT GENÉRICO
// ----------------------------------------
//
type GenericItem = {
  id: number;
  titulo: String; // <- CORREGIDO
};

type SelectBoxProps<T extends GenericItem> = {
  title: String;
  value?: number;
  items: T[];
  loading?: boolean;
  onChange: (value: number) => void;
};

export default function SelectBox<T extends GenericItem>({
  title,
  value,
  items,
  loading = false,
  onChange,
}: SelectBoxProps<T>) {
  return (
    <select
      className={`w-full h-10 mt-3 bg-zinc-800 rounded-md text-sm text-white  `}
      disabled={loading}
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value={-1}>{`-- ${title} --`}</option>
      <option value={0} >{`agregar ${title}`}</option>

      {items.map((item) => (
        <option key={item.id} value={item.id}>
          {item.titulo}
        </option>
      ))}
    </select>
  );
}