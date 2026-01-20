"use client";
import { createClient } from "@/lib/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Search, User as UserIcon, ShieldCheck, Phone, Mail, Loader2, Save } from "lucide-react";

interface TypeUsers {
  email: string;
  id: string;
}

function UserPlanForm({ users }: { users: TypeUsers[] }) {
  const supabase = createClient();

  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState<any>(null);
  const [plan, setPlan] = useState("");
  const [nombrePlanes, setNombrePlanes] = useState<any[]>([]);
  const [emailEncontrado, setEmailEncontrado] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUser(null); // Reset anterior

    const authId = users.find((u) => u.email.toLowerCase() === searchUser.toLowerCase());

    if (!authId) {
      toast.error(`El correo ${searchUser} no existe en Auth`, {
        style: { background: "#111", color: "#fff", border: "1px solid #E6392D" },
      });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("Usuarios")
      .select("*")
      .eq("auth_id", authId.id)
      .maybeSingle();

    if (error || !data) {
      toast.error("Usuario no encontrado en la tabla de perfiles.");
    } else {
      setUser(data);
      setEmailEncontrado(authId.email);
      toast.success("Usuario localizado");
    }
    setLoading(false);
  };

  async function fetchPlan() {
    if (user) {
      const { data: planUser } = await supabase
        .from("Planes_usuarios")
        .select("plan_id")
        .eq("usuario_id", user.id)
        .maybeSingle();
      
      if (planUser) setPlan(planUser.plan_id);

      const { data: planes } = await supabase.from("Planes").select("*");
      if (planes) setNombrePlanes(planes);
    }
  }

  const actualizarPlan = async (e: FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Actualizando plan...");
    
    const { error } = await supabase
      .from("Planes_usuarios")
      .update({ plan_id: plan })
      .eq("usuario_id", user.id);

    if (error) {
      toast.error("Error al actualizar", { id: loadingToast });
    } else {
      toast.success("¡Plan actualizado correctamente!", { id: loadingToast });
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* SECCIÓN DE BÚSQUEDA */}
      <div className="bg-[#0E2633]/30 border border-white/5 p-1 rounded-2xl flex items-center">
        <form onSubmit={handleSubmit} className="flex w-full gap-2 p-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="email"
              value={searchUser}
              placeholder="buscar@usuario.com"
              className="w-full bg-[#111111] text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#C6FF5B]/50 border border-white/10 transition-all"
              onChange={(e) => setSearchUser(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#C6FF5B] text-[#111111] px-8 py-3 rounded-xl font-bold hover:bg-[#a3d34a] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Buscar"}
          </button>
        </form>
      </div>

      {/* RESULTADO Y GESTIÓN */}
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Ficha de Usuario */}
          <div className="bg-[#0E2633]/30 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-[#C6FF5B] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <UserIcon size={16} /> Información Personal
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C6FF5B]/10 rounded-full flex items-center justify-center text-[#C6FF5B]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">Email de Cuenta</p>
                  <p className="text-white font-medium">{emailEncontrado}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-3 rounded-xl">
                  <p className="text-[10px] text-white/40 uppercase">Nombre</p>
                  <p className="text-white">{user.nombre || "---"}</p>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <p className="text-[10px] text-white/40 uppercase">Apellido</p>
                  <p className="text-white">{user.apellido || "---"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">Teléfono</p>
                  <p className="text-white">{user.telefono || "No registrado"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gestión de Plan */}
          <div className="bg-[#0E2633]/30 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-[#C6FF5B] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck size={16} /> Nivel de Acceso
              </h2>
              <form onSubmit={actualizarPlan} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/60 ml-1">Seleccionar Nuevo Plan</label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full bg-[#111111] text-white border border-white/10 p-3 rounded-xl outline-none focus:border-[#C6FF5B] appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,...")' }} // Opcional: icono de flecha
                  >
                    <option value="">-- Elegir plan --</option>
                    {nombrePlanes.map((n) => (
                      <option value={n.id} key={n.id}>
                        {n.nombre} {n.fase ? `(${n.fase})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white/5 border border-white/10 hover:border-[#C6FF5B] text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-white/10"
                >
                  <Save size={18} />
                  Actualizar Membresía
                </button>
              </form>
            </div>
            <p className="text-[10px] text-center text-white/20 mt-4 italic">
              ID Interno: {user.id}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPlanForm;