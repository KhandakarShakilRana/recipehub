"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function WithForm() {
    const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

    const { data, error } = await authClient.signUp.email({
    name,
    email,
    image,
    password,
  });
  if (error) {
   toast.success(error.message);
    return;
  }

    toast.success("Registration successful!");
     window.location.href = "/login";
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[70%_30%]">
      {/* Login Section */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>
              Enter your credentials to access your account
            </Card.Description>
          </Card.Header>

          <Form onSubmit={onSubmit}>
            <Card.Content>
              <div className="flex flex-col gap-4">
                <TextField name="name" type="name">
                  <Label>Name</Label>
                  <Input
                    placeholder="Please Enter Your Full Name"
                    variant="secondary"
                  />
                </TextField>
                <TextField name="email" type="email">
                  <Label>Email</Label>
                  <Input
                    placeholder="email@example.com"
                    variant="secondary"
                  />
                </TextField>
                <TextField name="image" type="url">
  <Label>Profile Image URL</Label>
  <Input
    placeholder="https://example.com/avatar.jpg"
    variant="secondary"
  />
</TextField>

                <TextField name="password" type="password">
                  <Label>Password</Label>
                  <Input placeholder="••••••••" variant="secondary" />
                </TextField>
              </div>
            </Card.Content>

            <Card.Footer className="mt-4 flex flex-col gap-2">
              <Button className="w-full bg-[#EBC76B] text-black" type="submit">
                Register
              </Button>

              <Link className="text-center underline text-sm" href="/login">
               Already have an account?
              </Link>
            </Card.Footer>
          </Form>
        </Card>
      </div>

      {/* Food Image - Hidden on Mobile */}
      <div className="hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Food"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}