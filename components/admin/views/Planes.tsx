"use client";
import { getAllPlans, updatePrice, updateProduct } from "@/lib/stripe";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function Planes() {
  const [planes, setPlanes] = useState<Stripe.Price[]>();
  const [loading, setLoading] = useState(true);

  const [selectPlan, setSelectPlan] = useState<number>();

  const handleOnchange = (e: number) => {
    setSelectPlan(e);
  };

  const fetchPlanes = async () => {
    const resPlanes = await getAllPlans();
    setPlanes(resPlanes);
    setLoading(false);
  };
  useEffect(() => {
    fetchPlanes();
  }, []);
  return loading! ? (
    <SkeletonPlanesAdmin />
  ) : (
    <ViewPlanes planes={planes} callback={handleOnchange} select={selectPlan} />
  );
}

function ViewPlanes({
  planes,
  callback,
  select,
}: {
  planes: Stripe.Price[] | undefined;
  callback: (e: number) => void;
  select: number | undefined;
}) {
  const plan = planes?.[select!];

  const [precio, setPrecio] = useState(Number(plan?.unit_amount ?? ""));
  const [nombre, setNombre] = useState(String(plan?.nickname ?? ""));

  const update = async (name: string, price: number, plan: any) => {
    const oldPrice = plan.id;
    const productId = plan.product;

    const resPrice = await updatePrice(productId, name, price);

    await updateProduct(oldPrice);
  };

  useEffect(() => {
    if (plan?.unit_amount !== undefined || plan?.nickname !== undefined) {
      setPrecio(Number(plan.unit_amount));
      setNombre(String(plan.nickname));
    } else {
      // setPrecio("");
      // setNombre("");
    }
  }, [plan]);
  return (
    <>
      <div className="min-h-full w-full px-5">
        {/* <pre>{JSON.stringify(plan, null, 2)}</pre> */}
        <button className="mt-3 rounded-md">Nuevo Plan</button>
        <select
          className="w-full h-10 mt-3 rounded-md bg-zinc-800 text-center"
          onChange={(e) => callback(Number(e.target.value))}
        >
          <option value={"#"}>- - Elige el Plan - -</option>
          {planes?.map((p, i) => (
            <option key={i} value={i}>
              {p.nickname}
            </option>
          ))}
        </select>
        <div className="flex flex-col mt-3 gap-3">
          <form action="">
            <h2 className="text-2xl">Datos Stripe</h2>
            <div className="">
              <label htmlFor="">Precio</label>
              <input
                type="text"
                className="w-full text-black px-2 py-1 rounded-md"
                value={precio}
                onChange={(e) => setPrecio(Number(e.target.value))}
              />
            </div>
            <div className="">
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                className="w-full text-black px-2 py-1 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            {/* <div className="">
              <label htmlFor="">Descripción</label>
              <input type="text" className="w-full" />
            </div> */}
            {/* <div className="">
              <label htmlFor="">Texto Boton</label>
              <input type="text" className="w-full" />
            </div> */}
            {/* <div className="">
              <label htmlFor="">Slug</label>
              <input type="text" className="w-full" />
            </div> */}
          </form>
        </div>
        <div className="flex justify-between mt-4 px-3">
          <button className="bg-zinc-800 rounded-md px-3 py-2 ">
            Eliminar
          </button>
          <button
            className="bg-zinc-800 rounded-md px-3 py-2 "
            // onClick={() => update(nombre, precio, plan)}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}

function SkeletonPlanesAdmin() {
  return (
    <div className="min-h-full w-full animate-pulse px-5">
      <div className="w-full h-10 mt-3 bg-zinc-800 rounded-md"></div>
      <div className="w-full h-10 mt-3 bg-zinc-800 rounded-md"></div>
      <div className="flex flex-col mt-3 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="bg-zinc-800 w-1/3 h-6 rounded-md"></div>
            <div className="bg-zinc-800 w-2/3 h-6 rounded-md"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 px-3">
        <div className="bg-zinc-800 rounded-md px-3 py-2 w-20 h-8"></div>
        <div className="bg-zinc-800 rounded-md px-3 py-2 w-20 h-8"></div>
      </div>
    </div>
  );
}
