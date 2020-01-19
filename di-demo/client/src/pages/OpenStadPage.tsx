import React, { useState, useEffect } from "react";
import { PageWrapper, IrmaBaseButtonStyle } from "../AppStyle";
import styled, { css } from "@datapunt/asc-core";
import { useParams, useHistory } from "react-router-dom";
import { createIrmaSession } from "../services/di";
import { QRModal, OpeStadInfo } from "../shared/components/Modal/QRModal";
import Radio, { RadioGroup } from "../shared/components/RadioOS";
import { ButtonStyleProps } from "../shared/components/Button/ButtonStyle";
import Button from "../shared/components/Button/Button";

const loginButtonPosition: ButtonStyleProps = {
  width: 224,
  height: 61,
  top: 966,
  left: 586
};

const homeButtonPosition: ButtonStyleProps = {
  width: 154,
  height: 67,
  top: 20,
  left: 200
};

const OpenStadPage: React.FC<{}> = () => {
  const { theme } = useParams();
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const vote = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setVoting(true);
  };

  const goHome = () => {
    history.push("/");
  };

  useEffect(() => {
    if (voting) {
      (async () => {
        const identifier = await createIrmaSession("email", "irma-qr");
        setVoting(false);
        setVoted(true);
      })();
    }
  }, [voting]);

  return (
    <PageWrapper>
      {!voted && (
        <>
          <img
            alt="Open Stad"
            src={`/assets/theme/${theme}/openstad.png`}
            height="1458"
            width="1400"
            decoding="async"
          />
          <Button
            onClick={vote}
            inactive={selectedOption == null}
            {...loginButtonPosition}
          ></Button>
          <RadioGroup name="vote">
            <Radio
              id="brug"
              name="brug"
              value="test-1"
              onChange={() => setSelectedOption("brug")}
              top={845}
              left={222}
            />
            <Radio
              id="kabelbaan"
              name="kabelbaan"
              value="test-2"
              onChange={() => setSelectedOption("kabelbaan")}
              top={845}
              left={596}
            />
          </RadioGroup>
        </>
      )}

      {!voting && <Button onClick={goHome} {...homeButtonPosition}></Button>}
      {voting && selectedOption && (
        <QRModal onClose={() => setVoting(false)} Info={OpeStadInfo} />
      )}

      {voted && (
        <>
          <img
            alt="Openstad"
            src={`/assets/theme/${theme}/openstad-voted.png`}
            height="1119"
            width="1400"
            decoding="async"
          />
        </>
      )}
    </PageWrapper>
  );
};

export default OpenStadPage;
