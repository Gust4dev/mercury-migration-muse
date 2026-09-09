import { supabase } from "@/integrations/supabase/client";

const BUCKET = "loja";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

/** Envia a imagem para o armazenamento da Loja e devolve uma URL utilizável no site. */
export async function uploadLojaImage(file: File, folder = "produtos") {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  const { data, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(path, TEN_YEARS);
  if (signError || !data?.signedUrl) throw signError ?? new Error("Não foi possível gerar o link da imagem");

  return { path, url: data.signedUrl };
}
