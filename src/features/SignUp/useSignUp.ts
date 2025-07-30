import { useEffect, useState } from "react";
import * as z from "zod";
import useUsers from "../Users/useUsers";

interface Position {
  id: number;
  name: string;
}

const formSchema = z.object({
  name: z.string("Name is required").min(2, "Name should be minimum 2 symbols"),
  email: z.email("Invalid email address"),
  phone: z
    .string("Phone is required")
    .regex(
      /^((?:\+?3)?8)[\s\-\(]*?(0\d{2})[\s\-\)]*?(\d{3})[\s\-]*?(\d{2})[\s\-]*?(\d{2})$/gm,
      "Invalid phone format"
    ),
  position_id: z.string("Position is required"),
  photo: z
    .file("Photo is required")
    .max(5242880, "5MB is maximum image size")
    .refine((file) => ["image/jpeg"].includes(file.type), {
      message: "Invalid file type",
    }),
});

type FormData = z.infer<typeof formSchema>;

const useSignUp = ({ reload }: { reload: () => void }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  useEffect(() => {
    const getPositions = async () => {
      try {
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/positions`);
        const data = await resp.json();
        setPositions(data.positions);
      } catch (err) {
        console.log(err);
      }
    };

    getPositions();
  }, []);

  const getToken = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: "POST",
      });

      const data = await res.json();
      return data?.token;
    } catch (err) {
      console.error(err);
    }
  };

  const validateForm = (updatedData: Partial<FormData>) => {
    const parsed = formSchema.safeParse(updatedData);
    if (parsed.success) {
      setErrors({});
      setIsValid(true);
    } else {
      const newErrors: Partial<Record<keyof FormData, string>> = {};
      parsed.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      setIsValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;

    const newValue = type === "file" ? files?.[0] : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      validateForm(updated);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) return;

    const form = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => {
      form.append(key, value as any);
    });

    console.log(parsed);
    setIsLoading(true);

    const token = await getToken();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: { Token: token },
        body: form,
      });
      const data = await res.json();
      console.log("Success:", data);
      setFormData({});
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
      setIsValid(false);
      reload();
    }
  };

  return {
    positions,
    errors,
    isValid,
    isLoading,
    isSubmitted,
    handleChange,
    handleSubmit,
  };
};

export default useSignUp;
