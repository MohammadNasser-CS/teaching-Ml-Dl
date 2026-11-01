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

## Guided classroom workflow (updated)

Each lab now has numbered steps and disabled actions until prerequisites are met. The supervised, clustering, semi-supervised, and neural-network labs let learners choose 60/40, 70/30, 80/20, or 90/10 train/test splits and reshuffle. Every row ID appears in a colored destination map and in the actual training or test tray. Changing the split clears learned state and scores.

- Regression displays its learned slope/intercept and every test row's prediction and absolute error. House area uses square metres directly.
- Spam classification learns its vocabulary and class counts only from the training messages. The 16-message toy dataset is split within each class to retain both labels; counts can differ slightly from the requested percentage due to rounding.
- Clustering separates assignment and center updates. Test articles use frozen centers. Distances are not labeled classification accuracy.
- Semi-supervised learning separates human-labeled training, unlabeled training, and held-out test pools. A weighted three-neighbor baseline proposes labels, accepted proposals form the retrained neighbor reference set, and both models are evaluated against the same test answers. Hidden reference labels are displayed for teaching but not passed to pseudo-label generation.
- Reinforcement learning is stateful: manual or automatic single moves expose state, action, reward, old/new Q values, and the numeric update. Terminal transitions use zero future value. Repeated training retains memory; slow test playback freezes it. No fixed train/test row split is imposed on interaction-generated experience.
- Neural-network training offers one or 100 epochs, visible hidden activations and output for a training row, decision surface, and per-test-row predictions. The illustrative network has one hidden layer; it is an introduction to mechanisms used in deeper networks, not itself a deep architecture.

Repeatedly tuning against displayed test results makes those results part of model selection. Use a fresh final test set for a formal evaluation. The deterministic reinforcement test demonstrates one start condition, not robust generalization.
