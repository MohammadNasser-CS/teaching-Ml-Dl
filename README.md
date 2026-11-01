# Najah AI · The Learning Lab

An interactive companion to Unit 03, Machine Learning & Deep Learning, for An-Najah National University's Introduction to AI and Data Science course (11000129).

## Run

Requires Node.js 20 or newer. No application dependencies, build step, credentials, database, or external dataset downloads are required.

```sh
cd /workspace/teaching-Ml-Dl
npm start
```

The server listens on port 3000 (override with `PORT`). Run `npm test` for seven algorithm checks. The UI runs its numerical models directly in the browser. Progress stays in browser local storage; it is not a teacher gradebook or account system.

## Experiments

- **Supervised:** synthetic student grades and house prices with least-squares regression, 48/12 training/test split, held-out MAE, noise control, predictions, and complete dataset tables. Text classification uses Laplace-smoothed multinomial Naive Bayes on eight visible examples.
- **Unsupervised:** step K-means through nearest-center assignments and mean updates. News coordinates are synthetic topic features, not generated text embeddings.
- **Semi-supervised:** change the human-label budget and confidence threshold for distance-weighted nearest-neighbor pseudo-label selection. Reveal hidden truth to inspect mistakes. This demonstrates selection, not a full iterative self-training system.
- **Reinforcement:** deterministic grid-world Q-learning, exploration control, episode rewards, and a greedy policy rollout. Rewards: goal +20, trap −10, step −1; α=.25, γ=.9.
- **Neural networks:** train a real one-hidden-layer tanh/sigmoid network using backpropagation, inspect its connections and decision surface, and measure held-out accuracy. This deliberately small network teaches mechanics; the accompanying explanation distinguishes it from deeper architectures.
- **Compare:** training workflow, comparison table, six formative questions with explanations, print view, and a suggested 60-minute teaching plan.

The English interface includes Arabic chapter terminology. All datasets are synthetic and all results are educational demonstrations. The supplied chapter guides the scope; nuanced notes clarify that deep learning is a model family, pseudo-label confidence is not guaranteed correctness, and accuracy, data requirements, feature extraction, and interpretability depend on the task.

No chapter PDF is redistributed. No student data leaves the browser. This is a runnable teaching website, not a production LMS. To deploy, use a Node-capable host and its assigned PORT, or serve index.html and src as static files. No deployment has been performed by this project setup.
