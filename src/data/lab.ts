import type { LabItem } from "./types.ts";

/*
 * Evidence: final resume (OTIF, SG&A, Snowflake evaluation, outfit prototype), the OTIF and
 * SG&A project code, and public GitHub repositories (linked). No accuracy figures are shown:
 * the underlying data is client data and results were not published.
 */
export const labItems: LabItem[] = [
  {
    id: "otif",
    skillKey: "otif",
    title: "OTIF delivery-risk prediction",
    status: "Model + API prototype",
    origin: "Onusworks",
    summary:
      "Predicts whether an order will be delivered On Time In Full, using only information available when the order is created.",
    details: [
      "Leakage-aware feature selection: fields that encode the future outcome are explicitly removed.",
      "Lead-time, calendar and tolerance features, plus historical miss rates per customer, route and plant.",
      "Chronological train/test split; XGBoost in a scikit-learn pipeline with class weighting for the minority 'miss' class.",
      "Probability calibration, a recall-first risk threshold, and SHAP explanations.",
      "Served through a FastAPI /predict endpoint that returns a risk label with human-readable recommendations, plus a Streamlit demo with threshold control.",
    ],
    stack: ["Python", "XGBoost", "scikit-learn", "SHAP", "FastAPI", "Streamlit", "Snowflake"],
  },
  {
    id: "sga",
    skillKey: "sga",
    title: "SG&A expense anomaly detection",
    status: "Analysis + model",
    origin: "Onusworks",
    summary:
      "Flags abnormal spending and potential cost leakage in SG&A expense data, and surfaces cost drivers.",
    details: [
      "Unsupervised detection with Isolation Forest, cross-checked against IQR and z-score methods.",
      "~45 engineered features: log / ratio / deviation-from-median transforms, percentile ranks, frequency encoding and cyclical period encoding.",
      "Exploratory analysis of distributions, correlations and categorical cardinality on masked ledger data.",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Plotly"],
  },
  {
    id: "snowflake",
    skillKey: "snowflake",
    title: "Snowflake-native AI/ML evaluation",
    status: "Evaluation",
    origin: "Onusworks",
    summary:
      "Evaluated Snowflake's native AI/ML capabilities (Cortex, Snowpark) for combining live and historical analytics inside the warehouse.",
    details: [
      "Explored running prediction and AI-assisted querying where the data already lives, instead of moving it to separate infrastructure.",
    ],
    stack: ["Snowflake", "Cortex", "Snowpark"],
  },
  {
    id: "cnn",
    skillKey: "cnn",
    title: "CNN from scratch, in pure Python",
    status: "Public repo",
    origin: "Personal",
    summary:
      "A convolutional network with no NumPy and no framework. Every matrix multiply, gradient and optimiser step is written by hand.",
    details: [
      "Convolution, batch normalisation, ReLU, max-pooling, dense layers, dropout and softmax cross-entropy.",
      "Hand-written backpropagation and the Adam optimiser, documented stage by stage.",
    ],
    stack: ["Python", "Deep learning"],
    href: "https://github.com/indrasenareddy2/CNN_Architecture",
    hrefLabel: "View repository",
  },
  {
    id: "outfit",
    skillKey: "outfit",
    title: "AI outfit suggestion prototype",
    status: "Internship prototype",
    origin: "VCodez",
    summary:
      "Image-recognition prototype: when a user selects a product, the model identifies the outfit and shows it on the user's photo.",
    details: ["Integrated with application teams so model outputs fed real-time app workflows."],
    stack: ["Python", "Machine learning", "Image recognition"],
  },
  {
    id: "breach",
    skillKey: "breach",
    title: "Cyber-attack breach prediction",
    status: "Public repo",
    origin: "Academic",
    summary: "Predictive model for network intrusion trained on the CICIDS2017 dataset, deployed behind FastAPI with a simple web front end.",
    details: ["Combined engineered features for prediction instead of raw per-feature inputs."],
    stack: ["Python", "Machine learning", "FastAPI"],
    href: "https://github.com/indrasenareddy2/Cyber-attack-breaches-prediction",
    hrefLabel: "View repository",
  },
];
