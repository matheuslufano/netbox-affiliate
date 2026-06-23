import { useState } from "react";

import "./App.css";

import logo from "../public/LOGO-NETBOX.png"; // sua logo aqui
import ubook from "../public/imgs/ubook.jpg";
import deezer from "../public/imgs/deezer-black.png";
import sky from "../public/imgs/sky-plus.png";
import prime from "../public/imgs/prime-video.png";
import disney from "../public/imgs/disney-plus.png";

import capas from "../public/logos/image.png"; // logos dos apps aqui
import { IoAdd, IoLogoWhatsapp } from "react-icons/io5";

const PLAN_NAME = "Plano Familia Netbox";

function readReferralCode() {
  const params = new URLSearchParams(window.location.search);
  const code =
    params.get("ref") ||
    params.get("shortCode") ||
    params.get("link");

  if (code) {
    sessionStorage.setItem("netboxReferralCode", code);
    return code;
  }

  return sessionStorage.getItem("netboxReferralCode") || "";
}

export default function App() {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [referralCode, setReferralCode] = useState(() => readReferralCode());
  const [copyStatus, setCopyStatus] = useState("");
  const [whatsappStatus, setWhatsappStatus] = useState("");

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
  const whatsappNumber = String(
    import.meta.env.VITE_WHATSAPP_NUMBER || ""
  ).replace(/\D/g, "");

  function getReferralCode() {
    const code = referralCode || readReferralCode();
    setReferralCode(code);
    return code;
  }

  async function copyReferralCode() {
    const code = getReferralCode();

    if (!code) {
      setCopyStatus("Codigo nao identificado");
      window.setTimeout(() => setCopyStatus(""), 2200);
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("Codigo copiado");
    } catch {
      setCopyStatus("Copie manualmente");
    }

    window.setTimeout(() => setCopyStatus(""), 2200);
  }

  function openPromoModal() {
    getReferralCode();
    setWhatsappStatus("");
    setIsPromoModalOpen(true);
  }

  function closePromoModal() {
    setIsPromoModalOpen(false);
    setWhatsappStatus("");
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closePromoModal();
    }
  }

  function buildWhatsappUrl() {
    if (!whatsappNumber) {
      return "";
    }

    const code = getReferralCode();
    const message = [
      `Tenho interesse no ${PLAN_NAME}.`,
      code ? `Codigo do afiliado: ${code}` : "",
      code ? "Quero garantir a promocao vinculada a esse codigo." : "",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  }

  async function handleWhatsappClick() {
    const code = getReferralCode();
    const fallbackUrl = buildWhatsappUrl();

    if (!whatsappNumber) {
      alert("Numero de WhatsApp nao configurado.");
      return;
    }

    if (!code) {
      window.location.href = fallbackUrl;
      return;
    }

    const trackingUrl = new URL(`/links/${code}/whatsapp`, apiBaseUrl);
    trackingUrl.searchParams.set("product", PLAN_NAME);
    trackingUrl.searchParams.set("source", "landing-page-whatsapp-modal");

    setWhatsappStatus("Abrindo WhatsApp...");

    try {
      const response = await fetch(trackingUrl.toString(), {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          product: PLAN_NAME,
          source: "landing-page-whatsapp-modal",
        }),
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel registrar o clique no WhatsApp.");
      }

      const data = await response.json();
      window.location.href = data.destination || fallbackUrl;
    } catch (error) {
      console.error("Erro ao registrar clique no WhatsApp:", error);
      window.location.href = fallbackUrl || trackingUrl.toString();
    }
  }

  return (
    <div>

      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Netbox" className="logo" />
        <div className="divider"></div>
        <h2 className="tagline">
          amizade que <strong>conecta</strong>
        </h2>
      </header>

      {/* FAIXA */}
      <div className="top-bar">
        SITE EXCLUSIVO PARA VENDAS <strong>NETBOX INTERNET</strong>
      </div>

      {/* HERO - seção do titulo */}
      <section className="hero">
        <h1>
          Quer internet para sua <br />
          casa com benefícios que <br />
          geram economia de verdade?
        </h1>

        {referralCode && (
          <div className="referral-card">
            <span>Codigo do afiliado</span>
            <strong>{referralCode}</strong>
            <p>
              Copie este codigo e informe no WhatsApp para garantir a promocao
              vinculada ao afiliado.
            </p>
            <button type="button" onClick={copyReferralCode}>
              {copyStatus || "Copiar codigo"}
            </button>
          </div>
        )}

        <button className="cta" onClick={openPromoModal}>
          QUERO CONHECER O PLANO
        </button>
      </section>

      {isPromoModalOpen && (
        <div
          className="lead-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-modal-title"
          onClick={handleOverlayClick}
        >
          <div className="lead-form-card promo-modal-card">
            <button
              className="lead-close"
              type="button"
              aria-label="Fechar aviso"
              onClick={closePromoModal}
            >
              X
            </button>

            <span className="lead-kicker">Plano Familia Netbox</span>
            <h2 id="promo-modal-title">Garanta sua promocao pelo WhatsApp</h2>

            <p className="promo-modal-description">
              Para garantir a promocao do afiliado, copie o codigo abaixo ou
              clique no botao do WhatsApp. A mensagem ja sera enviada com o
              codigo preenchido.
            </p>

            <div className="lead-referral-box promo-code-box">
              <span>Codigo do afiliado</span>
              <strong>{referralCode || "Nao identificado"}</strong>
              <button type="button" onClick={copyReferralCode}>
                {copyStatus || "Copiar codigo"}
              </button>
            </div>

            <div className="promo-modal-warning">
              <strong>Importante:</strong>
              <p>
                Ao falar com o atendente, mantenha o codigo na mensagem para
                que a promocao seja vinculada corretamente.
              </p>
            </div>

            {whatsappStatus && (
              <p className="promo-status" role="status">
                {whatsappStatus}
              </p>
            )}

            <button
              className="lead-submit promo-whatsapp-button"
              type="button"
              onClick={handleWhatsappClick}
            >
              <IoLogoWhatsapp /> CONTINUAR PELO WHATSAPP
            </button>
          </div>
        </div>
      )}

      {/* SEÇÃO - 1 POR QUE ESCOLHER */}
      <section className="why">
        <h2>Por que escolher a Netbox Internet?</h2>

        <p>
          Somos um provedor que se importa com você. Te entregamos
          a velocidade contratada com estabilidade e velocidade.
          Nosso time de atendimento se importa com você. Aqui é gente
          atendendo gente, todos os dias da semana! Aqui garantimos o que prometemos.
        </p>
      </section>

      {/* SEÇÃO - 2 PLANO + COMPARAÇÃO */}
      <section className="plan">

        <div className="plan-heading">
          <span className="plan-kicker">Plano completo para sua casa</span>
          <h2 className="plan-title">CONTRATE O PLANO FAMÍLIA</h2>
          <p>
            Internet de alta velocidade, apps inclusos e suporte premium em uma
            oferta simples para a rotina da família.
          </p>
        </div>

        <div className="plan-content">

          {/* TEXTO */}
          <div className="plan-left">
            <div className="speed-card">
              <span>Velocidade principal</span>
              <strong>700 MEGAS</strong>
              <p>Para streaming, jogos, trabalho remoto e vários dispositivos.</p>
            </div>

            <p className="paragrafo">
              Alta velocidade para navegação, streaming de vídeo e música
              e trabalhos pesados.
            </p>

            <h4>ASSINATURA INCLUSA</h4>
            {/* LINHA COM LOGO */}
            <div className="logo-line apps-grid">
              <div className="logo-item">
                <img src={ubook} alt="Logo ubook" className="logo-line-image" />
                <span className="subtitle">Ubook</span>
              </div>

              <div className="logo-item">
                <img src={deezer} alt="Logo deezer" className="logo-line-image" />
                <span className="subtitle">Deezer</span>
              </div>

              <div className="logo-item">
                <img src={sky} alt="Logo sky" className="logo-line-image" />
                <span className="subtitle">Sky</span>
              </div>

              <div className="logo-item">
                <img src={prime} alt="Logo prime" className="logo-line-image" />
                <span className="subtitle">Prime</span>
              </div>
            </div>

            <div className="bonus-card">
              <div className="bonus-icon">
                <IoAdd />
              </div>
              <div className="logo-item">
                  <img src={disney} alt="Logo disney" className="logo-line-image" />
              </div>
              <p>BÔNUS DE 3 MESES DE DISNEY+ SEM CUSTO ADICIONAL.</p>
            </div>

          </div>

          {/* BENEFÍCIOS */}
          <div className="plan-right">
            <span className="included-label">Também incluso</span>
            <ul>
              <li> <IoAdd /> 700 MEGAS</li>
              <li> <IoAdd /> ROTEADOR EM COMODATO</li>
              <li> <IoAdd /> SUPORTE PREMIUM</li>
              <li> <IoAdd /> INSTALAÇÃO PRIORITÁRIA</li>
            </ul>
          </div>

        </div>

        {/* COMPARAÇÃO */}
        <div className="compare-heading">
          <span>Compare e veja a economia</span>
          <h2 className="compare-title">QUEM COMPARA, ASSINA NETBOX</h2>
        </div>

        <div className="compare">

          <div className="compare-left">
            <h4>CONTRATANDO AVULSO</h4>
            <ul className="price-list">
              <li>
                <span>700 MEGA</span>
                <span>R$ 120,00</span>
              </li>
              <li>
                <span>UBOOK GO</span>
                <span>R$ 9,90</span>
              </li>
              <li>
                <span>DEEZER</span>
                <span>R$ 24,90</span>
              </li>
              <li>
                <span>SKY+</span>
                <span>R$ 12,90</span>
              </li>
              <li>
                <span>PRIME VIDEO</span>
                <span>R$ 22,90</span>
              </li>
              <li>
                <span>DISNEY+</span>
                <span>R$ 46,90</span>
              </li>
            </ul>

            <strong className="total">TOTAL: R$ 237,50</strong>
          </div>

          <div className="compare-right">
            <span className="best-choice">Melhor escolha</span>
            <h4>PLANO FAMÍLIA NETBOX</h4>

            <ul className="lista-plonos">
              <li> <IoAdd /> 700 MEGAS</li>
              <li> <IoAdd /> ROTEADOR EM COMODATO</li>
              <li> <IoAdd /> SUPORTE PREMIUM</li>
              <li> <IoAdd /> INSTALAÇÃO PRIORITÁRIA</li>
            </ul>

            <div className="price-box">
              <span>Aproveite essa oferta!</span>
              <h3>R$ 134,90/mês</h3>
              <p>Economia de R$ 102,60 por mês comparando com os serviços avulsos.</p>

              <button onClick={openPromoModal}>ASSINAR PELO WHATSAPP</button>
            </div>
          </div>

        </div>

      </section>

      {/* SEÇÃO - 3 STREAMING / BENEFÍCIOS */}
      <section className="streaming">
        <h2>
          Seu mundo com as melhores <br />
          séries e filmes pra maratonar, as <br />
          suas músicas favoritas e <br />
          audiolivros exclusivos!
        </h2>

        <div className="streaming-images">
          <img src={capas} alt="apps" />
        </div>
      </section>

      {/* SEÇÃO FINAL - OFERTA */}
      <section className="final-offer">

        <div className="final-offer-content">
          <div className="final-offer-copy">
            <span className="offer-kicker">Plano Família Netbox</span>

            <h2 className="final-title">
              QUEM COMPARA,<br />ASSINA NETBOX!
            </h2>

            <p className="final-description">
              Internet de verdade, apps inclusos e suporte premium em uma oferta
              simples para sua casa ficar sempre conectada.
            </p>

        <div className="ideal">
          <p>Esse plano é ideal para quem:</p>
          <div className="lista-ideal">
            <ul>
              <li>Assiste TV e streaming com frequência</li>
              <li>Trabalha ou estuda em casa</li>
              <li>Usa vários dispositivos ao mesmo tempo</li>
              <li>Quer mais estabilidade no dia a dia</li>
              <li>Quer mais benefícios sem pagar separado por isso</li>
              <li>Valoriza praticidade e suporte</li>
            </ul>
          </div>
        </div>

          </div>

        <div className="price-highlight">
            <span>APROVEITE AGORA ESSA OFERTA!</span>

            <h1>
              R$ 134,90 <small>/mês</small>
            </h1>

            <p>POR 12 MESES NO BOLETO BANCÁRIO</p>

            <div className="offer-savings">
              Economia de mais de R$ 100,00 comparado aos serviços avulsos.
            </div>

            <button className="cta" onClick={openPromoModal}>
              <IoLogoWhatsapp /> ASSINAR PELO WHATSAPP
            </button>
          </div>
        </div>

      </section>
  </div>
  );
}
