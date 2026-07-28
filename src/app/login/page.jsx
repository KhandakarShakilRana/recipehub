"use client";

import {
  Button,
  Card,
  Form,
  Input,
  Label,
  Link,
  TextField,
} from "@heroui/react";

export default function WithForm() {
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert("Form submitted successfully!");
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
                <TextField name="email" type="email">
                  <Label>Email</Label>
                  <Input
                    placeholder="email@example.com"
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
                Sign In
              </Button>

              <Link className="text-center text-sm" href="#">
                Forgot password?
              </Link>
            </Card.Footer>
          </Form>
        </Card>
      </div>

      {/* Food Image - Hidden on Mobile */}
      <div className="hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
          alt="Food"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}