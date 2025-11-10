CREATE TABLE "Autenticador_supabase" (
  "PK" id
);

CREATE TABLE "Lecciones_Vistas" (
  "FK" user_id,
  "FK" Lección_id,
  "Date" vista_en,
  "Boolean" Completados,
  "Date" Creado_en,
  "Date" Actualizado_en
);

CREATE TABLE "Permisos_usuario" (
  "PK" id,
  "FK" User_id,
  "FK" Nivel_acceso_id,
  "Date" Asignado_en,
  "Date" Actualizado_en
);

CREATE TABLE "usuario" (
  "PK" id,
  "FK" Auth_user_id,
  "Text" Nombre,
  "Text" Correo,
  "Text" Apellido,
  "Text" Avatar,
  "num" Nivel_experiencia,
  "Date" Creado_en,
  "Date" Actualizado_en,
  CONSTRAINT "FK_usuario_PK"
    FOREIGN KEY ("PK")
      REFERENCES "Lecciones_Vistas"("FK"),
  CONSTRAINT "FK_usuario_PK"
    FOREIGN KEY ("PK")
      REFERENCES "Permisos_usuario"("FK")
);

CREATE TABLE "Curso" (
  "PK" id,
  "Text" Titulo,
  "Text" Descripción,
  "FK" tipo_de_curso_id,
  "Text" url_vimeo,
  "Boolean" estado,
  "Date" Creado_en,
  "Date" actulizado_en,
  "Date" Creado_en,
  "Date" Actualizado_en
);

CREATE TABLE "Tipo de curso" (
  "PK" id,
  "Text " Nombre_tipo,
  "Num" Precio,
  "Date" Duración,
  "Date" Creado_en,
  "Date" Actualizado_en,
  CONSTRAINT "FK_Tipo de curso_PK"
    FOREIGN KEY ("PK")
      REFERENCES "Curso"("FK")
);

CREATE TABLE "Lección" (
  "PK" id,
  "FK" Curso_id,
  "Num" Precio,
  "Date" Duración,
  "Date" Creado_en,
  "Date" Actualizado_en,
  CONSTRAINT "FK_Lección_PK"
    FOREIGN KEY ("PK")
      REFERENCES "Lecciones_Vistas"("FK"),
  CONSTRAINT "FK_Lección_FK"
    FOREIGN KEY ("FK")
      REFERENCES "Curso"("PK")
);

CREATE TABLE "Inscripciones" (
  "PK" id,
  "FK" Curso_id,
  "FK" User_id,
  "Booleand" Estado,
  "Date" inscripto_en,
  "Date" fecha_de_fin,
  CONSTRAINT "FK_Inscripciones_FK"
    FOREIGN KEY ("FK")
      REFERENCES "usuario"("PK")
);

CREATE TABLE "Suscripciones " (
  "PK" id,
  "FK" Inscripción_id,
  "Text" strip_cust_id,
  "Text" strip_suscrp_id,
  "Boolean" Estado,
  "Date" Fin_periodo,
  "Date" Creado_en,
  "Date" Actualizado_en,
  CONSTRAINT "FK_Suscripciones _FK"
    FOREIGN KEY ("FK")
      REFERENCES "Inscripciones"("PK")
);

CREATE TABLE "Nivel_de_acceso" (
  "PK" id,
  "Text " Nombre,
  "Text" Nivel_prioridad,
  "Date" creado_en,
  "Date" Actualizado_en,
  CONSTRAINT "FK_Nivel_de_acceso_PK"
    FOREIGN KEY ("PK")
      REFERENCES "Permisos_usuario"("FK")
);
