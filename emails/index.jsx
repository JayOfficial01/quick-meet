import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const Email = ({
  userFirstName,
  duration,
  meetingTime,
  date,
  meetingUrl,
  businessName,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={""} />
          </Section>

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                height={100}
                src={
                  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/email-header%2Cevent-design-template-7054e40464e11111a1fae8eb4fe32271_screen.jpg?ts=1606153745"
                }
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {userFirstName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Thank you for scheduling Meeting with {businessName},
                </Heading>
                <Text>Please find the meeting details:</Text>
                <Text style={paragraph}>
                  <b>Time: </b>
                  {meetingTime}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Date: </b>
                  {date}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: </b>
                  {meetingUrl}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>duration: </b>
                  {duration}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Please Join meeting on above details
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button href={meetingUrl} style={button}>
                  Join Now
                </Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              height={100}
              src={
                "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/email-header%2Cevent-design-template-7054e40464e11111a1fae8eb4fe32271_screen.jpg?ts=1606153745"
              }
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | Quick Meet | Jahangir Khan
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#0069ff",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
