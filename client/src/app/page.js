'use client'
import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { useFormik } from 'formik';
import Image from "next/image";

export default function Main() {
  const [selected, setSelected] = React.useState("login");
  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: 'ram gopal',
      phoneNumber: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="flex flex-col w-full ">
      <Card className=" flex self-center max-w-full w-[340px] ">
    <Image src= "/logo.png" width={100} height={100} alt="logo"/>
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
 
            <Tab key="sign-up" title="Sign up">
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 ">
              <Input
               name="phoneNumber"
               onChange={formik.handleChange}
               value={formik.values.phoneNumber}
              isRequired label="Phone Number" placeholder="Enter your phoneNumber"  />
              <Input
                 name="fullName"
                 onChange={formik.handleChange}
                 value={formik.values.fullName}
               isRequired label="fullName" placeholder="Enter your fullName" />
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                   name="password"
                   onChange={formik.handleChange}
                   value={formik.values.password}
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
