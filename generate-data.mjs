import {writeFile} from 'node:fs/promises';
const sources={
 ai:['Poole & Mackworth','Fondements de l’IA et architectures d’agents','https://artint.info/3e/html/ArtInt3e.html','Ouvrage académique, 2023'],
 sk:['scikit-learn','Guide de l’apprentissage automatique','https://scikit-learn.org/stable/user_guide.html','Documentation officielle'],
 ensemble:['scikit-learn','Méthodes d’ensemble','https://scikit-learn.org/stable/modules/ensemble.html','Documentation officielle'],
 cluster:['scikit-learn','Clustering','https://scikit-learn.org/stable/modules/clustering.html','Documentation officielle'],
 metrics:['scikit-learn','Mesures et évaluation','https://scikit-learn.org/stable/modules/model_evaluation.html','Documentation officielle'],
 torch:['PyTorch','Tenseurs, réseaux et entraînement','https://docs.pytorch.org/tutorials/beginner/basics/intro.html','Documentation officielle'],
 hf:['Hugging Face','Transformers : texte, vision et audio','https://huggingface.co/docs/transformers/index','Documentation officielle'],
 diffusers:['Hugging Face','Diffusers : génération multimédia','https://huggingface.co/docs/diffusers/index','Documentation officielle'],
 attention:['Vaswani et al.','Attention Is All You Need','https://arxiv.org/abs/1706.03762','Article de recherche, 2017'],
 rag:['Lewis et al.','Retrieval-Augmented Generation','https://arxiv.org/abs/2005.11401','Article de recherche, 2020'],
 rl:['Spinning Up','Concepts de l’apprentissage par renforcement','https://spinningup.openai.com/en/latest/spinningup/rl_intro.html','Documentation de recherche'],
 lora:['Hu et al.','LoRA : adaptation de faible rang','https://arxiv.org/abs/2106.09685','Article de recherche, 2021'],
 dpo:['Rafailov et al.','Direct Preference Optimization','https://arxiv.org/abs/2305.18290','Article de recherche, 2023'],
 diffusion:['Ho et al.','Denoising Diffusion Probabilistic Models','https://arxiv.org/abs/2006.11239','Article de recherche, 2020'],
 gan:['Goodfellow et al.','Generative Adversarial Networks','https://arxiv.org/abs/1406.2661','Article de recherche, 2014'],
 rdf:['W3C','RDF : graphes et triplets','https://www.w3.org/TR/rdf11-concepts/','Recommandation technique'],
 mlflow:['MLflow','Plateforme d’ingénierie et cycle de vie IA','https://mlflow.org/docs/latest/ml/','Documentation officielle'],
 mcp:['Model Context Protocol','Protocole de connexion aux outils et données','https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro','Documentation officielle'],
 owasp:['OWASP','Risques de sécurité des applications LLM','https://genai.owasp.org/llm-top-10/','Référentiel de sécurité'],
 nist:['NIST','AI Risk Management Framework','https://www.nist.gov/itl/ai-risk-management-framework','Cadre volontaire de gestion des risques'],
 pyg:['PyTorch Geometric','Apprentissage sur graphes','https://pytorch-geometric.readthedocs.io/en/latest/get_started/introduction.html','Documentation officielle'],
 quant:['Hugging Face','Quantification des modèles','https://huggingface.co/docs/transformers/en/quantization/overview','Documentation officielle'],
 clip:['Radford et al.','Apprentissage contrastif vision-langage','https://arxiv.org/abs/2103.00020','Article de recherche, 2021'],
 vae:['Kingma & Welling','Auto-Encoding Variational Bayes','https://arxiv.org/abs/1312.6114','Article de recherche, 2013'],
 ssm:['Gu & Dao','Mamba et espaces d’état sélectifs','https://arxiv.org/abs/2312.00752','Article de recherche, 2023'],
 federated:['McMahan et al.','Apprentissage sur données décentralisées','https://arxiv.org/abs/1602.05629','Article de recherche, 2016'],
 rec:['PyTorch','Systèmes de recommandation et embeddings','https://docs.pytorch.org/tutorials/intermediate/torchrec_intro_tutorial.html','Documentation officielle'],
 vllm:['vLLM','Moteur de service et d’inférence LLM','https://docs.vllm.ai/en/latest/','Documentation officielle']
};
const nodes=[];
function add(id,parent,label,kind,summary,use,caution,src,tags='',color=''){
 nodes.push({id,parent,label,kind,summary,use,caution,sources:src.split(','),tags:tags.split(',').filter(Boolean),color});
}
function d(id,label,color,summary,use,caution,src,tags){add(id,'ai',label,'domaine',summary,use,caution,src,tags,color)}
function g(id,parent,label,summary,use,caution,src,tags){add(id,parent,label,'sous-domaine',summary,use,caution,src,tags)}
function n(id,parent,label,summary,use,caution,src,tags,kind='méthode'){add(id,parent,label,kind,summary,use,caution,src,tags)}
add('ai',null,'Intelligence artificielle','racine','Étudier et construire des systèmes capables de percevoir, apprendre, raisonner ou agir pour atteindre un objectif.','Relier les capacités techniques aux usages et aux décisions d’architecture.','Cette cartographie est une organisation pédagogique : les domaines se recoupent et ne constituent pas une taxonomie universelle.','ai,nist','AI,IA,artificial intelligence','#7765c8');
d('symbolic','Fondements & raisonnement','#8c769b','Logique, recherche, probabilités et représentation structurée pour expliquer et résoudre des problèmes.','Formaliser des règles métier et des décisions.','Un raisonnement formel dépend de la qualité des hypothèses.','ai','symbolic AI,GOFAI,IA symbolique');
d('ml','Machine learning','#5a8b74','Apprendre des régularités à partir de données pour prédire, regrouper ou décider.','Scoring, prévision et détection de comportements inhabituels.','Une bonne performance historique ne garantit pas la performance future.','sk,rl','ML,apprentissage automatique');
d('dl','Deep learning','#6d83b8','Utiliser des réseaux neuronaux à plusieurs niveaux pour apprendre des représentations.','Traiter des signaux complexes ou de grands corpus.','Besoin de données, de calcul et d’une évaluation adaptée.','torch,attention','DL,apprentissage profond,neural');
d('nlp','Langage & parole','#b88756','Analyser ou produire du langage écrit et des signaux de parole.','Comprendre des documents et des interactions vocales.','Les langues, accents et contextes modifient les performances.','hf','NLP,TAL,language,speech');
d('vision','Vision & multimodalité','#6697a6','Interpréter les images et combiner plusieurs modalités d’information.','Inspection, compréhension de documents et interfaces multimodales.','La perception reste sensible aux conditions de capture.','hf,torch','computer vision,CV,multimodal');
d('gen','IA générative','#8b68b5','Produire du texte, des images, du code ou d’autres contenus à partir de distributions apprises.','Assistants, création et synthèse documentaire.','Un contenu plausible peut être faux ou inadapté.','hf,diffusers','GenAI,generative AI');
d('agents','Agents & systèmes autonomes','#bb7976','Combiner perception, décision, outils et actions pour poursuivre un objectif.','Orchestrer des tâches et contrôler des systèmes.','L’autonomie doit être bornée par les permissions et le contrôle humain.','ai,mcp','agentic AI,robotics,robotique');
d('data','Données & connaissances','#829456','Préparer, représenter et retrouver l’information qui alimente les systèmes IA.','Construire un socle de données fiable et accessible.','La qualité, la provenance et les droits d’accès restent déterminants.','sk,rdf,rag','knowledge,data engineering');
d('ops','Ingénierie & plateformes','#748a9b','Industrialiser l’entraînement, l’inférence et l’exploitation des systèmes IA.','Passer d’un prototype à un service suivi en production.','Coûts, latence et exploitation doivent être mesurés ensemble.','mlflow,vllm,torch','MLOps,LLMOps,AI engineering');
d('trust','Évaluation & gouvernance','#9a8a65','Évaluer les résultats et piloter les risques, responsabilités et contrôles.','Définir les critères d’acceptation et suivre les usages.','Les contrôles doivent correspondre au contexte réel d’utilisation.','nist,owasp,metrics','AI governance,responsible AI,trustworthy AI');

g('logic','symbolic','Logique & règles','Représenter des faits et déduire des conséquences suivant des règles explicites.','Décisions métier traçables.','Une base de règles peut devenir difficile à maintenir.','ai');
n('expert','logic','Systèmes experts','Moteur d’inférence appliquant une base de connaissances et de règles.','Diagnostic assisté dans un domaine limité.','La couverture dépend des connaissances encodées.','ai','expert systems');
n('fuzzy','logic','Logique floue','Raisonner avec des degrés d’appartenance plutôt que des catégories strictement binaires.','Contrôle avec critères graduels.','Les fonctions d’appartenance nécessitent une justification métier.','ai','fuzzy logic');
n('constraints','logic','Contraintes & solveurs','Trouver des affectations satisfaisant des contraintes formalisées.','Planification de ressources.','Le temps de résolution dépend de la difficulté du problème.','ai','CSP,SAT,SMT');
g('search','symbolic','Recherche & planification','Explorer des états et des séquences d’actions possibles.','Trouver une route ou un plan faisable.','L’espace des possibilités peut croître très rapidement.','ai');
n('astar','search','Recherche A*','Combiner un coût déjà parcouru et une estimation du coût restant.','Recherche de chemin.','Les garanties dépendent des propriétés de l’heuristique.','ai','A star,A-star');
n('planning','search','Planification automatique','Construire une séquence d’actions à partir de préconditions et d’effets.','Orchestration sous contraintes.','Un modèle incomplet des effets produit des plans fragiles.','ai','automated planning');
n('optimization','search','Optimisation combinatoire','Choisir la meilleure solution parmi un ensemble discret sous contraintes.','Affectation et ordonnancement.','Une heuristique ne garantit pas toujours l’optimum.','ai');
g('uncertainty','symbolic','Incertitude & causalité','Exprimer ce qui est inconnu et distinguer associations et effets causaux.','Décision lorsque l’information est partielle.','La corrélation ne suffit pas à établir un effet causal.','ai');
n('bayes','uncertainty','Réseaux bayésiens','Représenter des dépendances probabilistes dans un graphe orienté acyclique.','Diagnostic probabiliste.','La structure et les probabilités doivent être validées.','ai','Bayesian networks');
n('causal','uncertainty','Inférence causale','Estimer l’effet d’une intervention avec des hypothèses explicites.','Mesurer l’impact d’une décision.','Les facteurs confondants peuvent invalider une conclusion.','ai','causal inference');
n('neurosymbolic','uncertainty','IA neuro-symbolique','Associer apprentissage neuronal et contraintes ou représentations symboliques.','Combiner extraction et règles vérifiables.','Les bénéfices dépendent du mécanisme concret d’intégration.','ai,torch','neuro-symbolic AI','approche');

g('supervised','ml','Apprentissage supervisé','Apprendre un lien entre observations et cibles connues.','Prédire une classe ou une valeur.','Les étiquettes et le découpage des données conditionnent la validité.','sk');
n('classification','supervised','Classification','Prédire une catégorie à partir de variables d’entrée.','Orientation des demandes.','Choisir des métriques adaptées aux classes déséquilibrées.','sk,metrics');
n('regression','supervised','Régression','Estimer une valeur numérique à partir de variables d’entrée.','Prévision de volumes.','L’extrapolation hors des données peut être fragile.','sk');
n('trees','supervised','Arbres de décision','Partitionner les observations par une succession de tests.','Règles de décision lisibles.','Des arbres profonds peuvent surapprendre.','sk','decision tree');
n('forest','supervised','Random forests','Agréger des arbres entraînés avec de la diversité dans les données et variables.','Prédictions sur données tabulaires.','Un ensemble est moins directement lisible qu’un arbre.','ensemble','forêts aléatoires');
n('boosting','supervised','Gradient boosting','Construire progressivement un ensemble corrigeant les erreurs précédentes.','Scoring sur données tabulaires.','Le réglage et la validation restent essentiels.','ensemble','GBDT,XGBoost,LightGBM,CatBoost');
n('svm','supervised','Machines à vecteurs de support','Apprendre une séparation avec marge, éventuellement à l’aide d’un noyau.','Classification avec représentations structurées.','Le choix du noyau et le passage à l’échelle demandent attention.','sk','SVM,support vector machine');
g('unsupervised','ml','Apprentissage non supervisé','Découvrir une structure sans cible étiquetée.','Explorer des populations et des représentations.','Une structure statistique n’est pas automatiquement pertinente métier.','sk,cluster');
n('clustering','unsupervised','Clustering','Regrouper des observations selon une notion de similarité.','Segmentation exploratoire.','Le résultat dépend de la distance et des paramètres.','cluster','K-means,DBSCAN,HDBSCAN');
n('pca','unsupervised','Réduction de dimension','Projeter les données dans un espace de moindre dimension.','Compression et visualisation.','Une projection peut perdre des informations utiles.','sk','PCA,UMAP,t-SNE');
n('anomaly','unsupervised','Détection d’anomalies','Repérer des observations éloignées d’un comportement de référence.','Alertes et surveillance.','Une anomalie ne prouve pas une fraude.','sk','outlier,isolation forest');
g('paradigms','ml','Autres régimes d’apprentissage','Exploiter différents types de supervision et modes d’accès aux données.','Adapter l’apprentissage aux données disponibles.','Le régime doit correspondre aux contraintes opérationnelles.','sk,rl');
n('semi','paradigms','Semi-supervisé','Combiner un petit ensemble étiqueté et des données non étiquetées.','Réduire l’effort d’annotation.','De mauvaises pseudo-étiquettes peuvent amplifier les erreurs.','sk');
n('self','paradigms','Auto-supervisé','Créer un signal d’apprentissage à partir de la structure des données elles-mêmes.','Préapprendre des représentations.','L’objectif de préapprentissage peut différer de l’usage final.','hf','self-supervised');
n('transfer','paradigms','Apprentissage par transfert','Réutiliser des représentations ou paramètres appris pour une autre tâche.','Adapter un modèle avec moins de données.','Un domaine trop différent peut limiter le transfert.','torch,hf','transfer learning');
n('rl','paradigms','Apprentissage par renforcement','Apprendre une politique d’action pour maximiser une récompense cumulée.','Décisions séquentielles.','Une récompense mal définie favorise des comportements indésirables.','rl','reinforcement learning,RL');
n('qlearning','rl','Q-learning & DQN','Estimer la valeur d’une action dans un état pour choisir une politique.','Contrôle dans un environnement discret.','Stabilité et exploration nécessitent une évaluation.','rl,torch');
n('ppo','rl','Policy gradients & PPO','Optimiser directement une politique avec des mises à jour contrôlées.','Entraîner des comportements séquentiels.','L’apprentissage peut consommer de nombreuses interactions.','rl','actor-critic');

g('neural','dl','Réseaux neuronaux','Composer des couches paramétrées ajustées par entraînement.','Apprendre des transformations non linéaires.','L’architecture et les données déterminent le comportement.','torch');
n('mlp','neural','Perceptron multicouche','Empiler des couches de neurones connectées avec fonctions d’activation.','Modélisation non linéaire.','Il n’exploite pas explicitement toutes les structures des signaux.','torch','MLP');
n('cnn','neural','Réseaux convolutifs','Partager des filtres locaux pour traiter la structure spatiale.','Reconnaissance d’images.','Les changements de domaine visuel peuvent dégrader les résultats.','torch','CNN,convolution');
n('rnn','neural','Réseaux récurrents','Traiter des séquences avec un état mis à jour au fil des éléments.','Séries et signaux séquentiels.','Les dépendances longues peuvent être difficiles à apprendre.','torch','RNN,LSTM,GRU');
n('gnn','neural','Réseaux de neurones sur graphes','Propager et agréger des informations selon des relations entre nœuds.','Analyse de réseaux.','La qualité des relations du graphe est déterminante.','pyg','GNN,graph neural network');
g('transformers','dl','Transformers & attention','Modéliser les interactions entre éléments avec des mécanismes d’attention.','Langage, vision et signaux multimodaux.','Le coût augmente avec les séquences et le modèle.','attention,hf');
n('attention','transformers','Auto-attention','Pondérer les relations entre éléments d’une même séquence.','Représentations dépendantes du contexte.','Les poids d’attention ne constituent pas une explication complète.','attention','self-attention');
n('encoder','transformers','Encodeur / décodeur','Encoder une entrée, produire une sortie, ou combiner les deux structures.','Choisir une architecture adaptée à la tâche.','Ces familles ne sont pas interchangeables pour tous les usages.','attention,hf','BERT,GPT,T5');
n('moe','transformers','Mixture of Experts','Router chaque entrée vers une partie d’un ensemble d’experts neuronaux.','Augmenter la capacité avec activation sélective.','Le routage et la distribution compliquent l’exploitation.','hf','MoE','architecture');
g('training','dl','Entraînement & représentations','Ajuster les paramètres et apprendre des espaces de caractéristiques utiles.','Construire un modèle qui généralise.','Optimiser la perte d’entraînement ne suffit pas.','torch');
n('backprop','training','Rétropropagation','Calculer des gradients par la règle de chaîne pour ajuster les paramètres.','Entraînement différentiable.','Les gradients peuvent devenir instables.','torch','backpropagation,autograd');
n('regularization','training','Régularisation','Limiter la complexité effective pour améliorer la généralisation.','Réduire le surapprentissage.','Un excès de régularisation peut dégrader l’apprentissage.','torch,sk','dropout,weight decay');
n('embedding','training','Embeddings','Représenter des objets dans un espace vectoriel appris.','Similarité sémantique et recherche.','La proximité vectorielle dépend du modèle et du domaine.','hf,rag','vector representation,plongements');

g('text','nlp','Compréhension du texte','Extraire ou analyser des informations présentes dans des textes.','Structuration documentaire.','Le contexte et les ambiguïtés linguistiques restent importants.','hf');
n('token','text','Tokenisation','Découper un texte en unités manipulables par un modèle.','Préparer les entrées de langage.','Un token n’est pas toujours un mot.','hf','tokenizer,BPE');
n('ner','text','Entités nommées','Repérer et classer des mentions comme personnes, organisations ou lieux.','Extraction documentaire.','Les entités métier exigent souvent des adaptations.','hf','NER,named entity recognition');
n('sentiment','text','Analyse de sentiment','Estimer une tonalité ou une opinion dans un texte.','Analyse de retours.','Ironie et contexte peuvent inverser l’interprétation.','hf');
n('translation','text','Traduction automatique','Transformer un texte d’une langue vers une autre.','Documents multilingues.','La terminologie spécialisée nécessite une vérification.','hf');
g('speech','nlp','Parole & audio','Relier signaux audio, texte et représentations sonores.','Interactions vocales.','Bruit et accents influencent la qualité.','hf');
n('asr','speech','Reconnaissance vocale','Transcrire un signal de parole en texte.','Compte rendu assisté.','Vérifier les noms propres et les chiffres.','hf','ASR,speech to text,STT');
n('tts','speech','Synthèse vocale','Produire de la parole à partir d’un texte ou d’une représentation.','Lecture et interfaces vocales.','Consentement et prévention de l’usurpation sont essentiels.','hf','TTS,text to speech');
n('audio','speech','Classification audio','Associer une catégorie à un segment sonore.','Détection d’événements acoustiques.','L’environnement sonore modifie la distribution des données.','hf');

g('perception','vision','Perception visuelle','Localiser, reconnaître et segmenter des éléments d’une image.','Inspection et analyse de scènes.','Valider dans les conditions réelles de capture.','hf,torch');
n('imageclass','perception','Classification d’images','Attribuer une catégorie à une image.','Tri visuel.','Une catégorie globale ne localise pas l’objet.','hf,torch');
n('detection','perception','Détection d’objets','Localiser des objets et prédire leur catégorie.','Comptage et inspection.','Occlusion et objets petits posent des difficultés.','hf,torch','object detection,YOLO');
n('segmentation','perception','Segmentation','Attribuer des catégories ou instances à des pixels.','Délimitation de zones visuelles.','La précision des contours doit être mesurée.','hf','SAM,image segmentation');
n('ocr','perception','Lecture de documents & OCR','Reconnaître du texte et exploiter la structure d’un document visuel.','Numérisation et extraction.','Les scans et tableaux complexes exigent une validation.','hf','optical character recognition');
g('multimodal','vision','Apprentissage multimodal','Aligner et combiner des informations de plusieurs modalités.','Compréhension texte-image-audio.','Une modalité peut dominer ou contredire les autres.','hf');
n('vlm','multimodal','Modèles vision-langage','Associer compréhension d’image et traitement du langage.','Questions sur des images et documents.','Une description peut contenir des détails inventés.','hf','VLM,vision language models');
n('contrastive','multimodal','Apprentissage contrastif','Rapprocher des représentations correspondantes et éloigner les autres.','Recherche texte-image.','Le choix des exemples positifs et négatifs influence l’espace appris.','clip','CLIP,contrastive learning');
n('video','multimodal','Compréhension vidéo','Analyser l’évolution d’éléments visuels au cours du temps.','Reconnaissance d’activités.','L’échantillonnage peut manquer des événements courts.','hf');

g('foundation','gen','Modèles & génération','Modèles préentraînés et mécanismes produisant de nouveaux contenus.','Réutiliser une base généraliste.','Les capacités doivent être évaluées pour chaque usage.','hf,diffusers');
n('foundationmodel','foundation','Modèles de fondation','Modèles entraînés largement et adaptables à plusieurs tâches.','Socle commun pour des applications.','Généraliste ne signifie pas fiable dans tous les domaines.','hf,nist','foundation models','approche');
n('llm','foundation','Grands modèles de langage','Modèles de langage de grande capacité apprenant des distributions de séquences.','Assistant rédactionnel et documentaire.','Ils peuvent produire des affirmations non fondées.','hf,nist','LLM,large language model');
n('diffusion','foundation','Modèles de diffusion','Apprendre à générer en inversant progressivement un processus de bruitage.','Synthèse d’images et de signaux.','La qualité dépend du conditionnement et de l’évaluation.','diffusion,diffusers');
n('gan','foundation','Réseaux antagonistes génératifs','Faire apprendre un générateur et un discriminateur en compétition.','Synthèse de données visuelles.','L’entraînement peut être instable et manquer de diversité.','gan','GAN');
n('autoregressive','foundation','Génération autorégressive','Produire une séquence en conditionnant chaque élément sur les précédents.','Génération de texte ou de code.','Les erreurs initiales peuvent influencer la suite.','hf');
g('adaptation','gen','Adaptation & alignement','Ajuster un modèle et ses comportements pour un contexte d’usage.','Spécialiser un assistant.','L’adaptation nécessite des critères de validation propres au contexte.','hf,lora,dpo');
n('prompt','adaptation','Conception de prompts','Structurer instructions, contexte et exemples fournis au modèle.','Guider une réponse.','Un prompt ne constitue pas une frontière de sécurité.','hf,owasp','prompt engineering');
n('finetune','adaptation','Fine-tuning supervisé','Continuer l’entraînement sur des exemples ciblés.','Adapter style et comportements.','Ne remplace pas une base documentaire à jour.','hf,lora','SFT,supervised fine tuning');
n('lora','adaptation','LoRA & PEFT','Adapter un modèle avec un nombre réduit de paramètres entraînables.','Réduire le coût d’adaptation.','Le gain dépend de la tâche et de la configuration.','lora,hf');
n('rlhf','adaptation','RLHF','Utiliser des préférences humaines et un apprentissage par renforcement pour ajuster un modèle.','Aligner le comportement sur des préférences.','Les préférences et le modèle de récompense peuvent introduire des biais.','rl,dpo','reinforcement learning from human feedback');
n('dpo','adaptation','DPO','Optimiser directement le modèle à partir de paires de préférences.','Ajuster sans boucle RL explicite.','La qualité des paires de préférences reste essentielle.','dpo','direct preference optimization');
g('generationapps','gen','Patterns d’application','Associer modèles, contexte et contrôles dans une application.','Transformer la génération en service utile.','La fiabilité dépend de toute la chaîne.','rag,hf,owasp');
n('rag','generationapps','Génération augmentée par recherche','Retrouver des informations externes et les fournir au générateur.','Questions sur un corpus d’entreprise.','La recherche peut échouer et la génération peut mal exploiter les sources.','rag','RAG,retrieval augmented generation','architecture');
n('codegen','generationapps','Génération de code','Produire ou modifier du code à partir d’un contexte et d’instructions.','Assistance au développement.','Tester le code et vérifier ses dépendances et sa sécurité.','hf,owasp');
n('structured','generationapps','Sorties structurées','Contraindre ou valider une sortie selon un schéma attendu.','Intégration dans des processus.','La validité du format ne prouve pas celle des valeurs.','hf,mcp','JSON,schema');
n('summarize','generationapps','Synthèse documentaire','Produire une version condensée d’une ou plusieurs sources.','Préparation de décisions.','Contrôler les omissions et la fidélité aux sources.','hf');

g('agentarch','agents','Architecture d’agents','Organiser objectifs, contexte, décisions et actions.','Automatiser des tâches avec étapes.','Définir les limites d’action et les conditions d’arrêt.','ai,mcp');
n('tooluse','agentarch','Appel d’outils','Permettre à un système de demander une opération structurée.','Requêtes et actions contrôlées.','Les permissions doivent être appliquées hors du modèle.','mcp,owasp','tool use,function calling');
n('memory','agentarch','Mémoire & état','Conserver des informations utiles entre les étapes d’un agent.','Continuité des tâches.','Prévoir durée de conservation et isolement des contextes.','ai,mcp');
n('agentplanning','agentarch','Boucle de planification','Décomposer un objectif et réviser un plan selon les observations.','Résolution de tâches à plusieurs étapes.','Un plan plausible peut comporter des actions incorrectes.','ai');
n('multiagent','agentarch','Systèmes multi-agents','Faire interagir plusieurs agents aux responsabilités définies.','Répartir ou coordonner des tâches.','La coordination augmente les coûts et les modes de défaillance.','ai','multi-agent systems,MAS','architecture');
n('mcp','agentarch','Model Context Protocol','Standardiser les échanges entre applications IA, outils et ressources.','Connecter des services.','La standardisation ne garantit pas la sécurité d’un serveur.','mcp,owasp','MCP','technologie');
g('robotics','agents','Robotique & contrôle','Percevoir un environnement physique et commander des actions.','Navigation et manipulation.','Les erreurs peuvent avoir des conséquences physiques.','ai,rl');
n('slam','robotics','Localisation & cartographie','Estimer une position et une carte à partir d’observations.','Navigation autonome.','Les changements de scène et les capteurs dégradent l’estimation.','ai','SLAM');
n('imitation','robotics','Apprentissage par imitation','Apprendre un comportement à partir de démonstrations.','Acquisition de gestes ou stratégies.','Les démonstrations ne couvrent pas toutes les situations.','ai,rl');
n('control','robotics','Contrôle adaptatif','Ajuster des actions à partir de l’état et des objectifs d’un système.','Pilotage avec rétroaction.','Les contraintes de stabilité et de sécurité doivent être explicites.','ai,rl');

g('dataprep','data','Préparation & qualité','Organiser les données et contrôler leur aptitude à l’usage.','Fiabiliser l’entraînement et la recherche.','Les erreurs de préparation se propagent dans la chaîne.','sk,mlflow');
n('features','dataprep','Feature engineering','Construire des variables pertinentes à partir des données brutes.','Modèles tabulaires.','Éviter les informations indisponibles au moment de la prédiction.','sk');
n('labeling','dataprep','Annotation & jeux de données','Définir et produire les exemples et cibles utilisés pour apprendre ou évaluer.','Constitution d’un corpus.','Mesurer la cohérence entre annotateurs.','sk,nist');
n('pipeline','dataprep','Pipelines de données','Enchaîner des transformations reproductibles des entrées.','Préparation cohérente des données.','Prévenir les fuites entre entraînement et test.','sk,mlflow','ETL,ELT');
n('provenance','dataprep','Provenance & traçabilité','Conserver l’origine et les transformations des données utilisées.','Audit et reproduction.','Une origine connue ne suffit pas à garantir la qualité.','rdf,nist');
g('retrieval','data','Recherche & indexation','Retrouver les éléments pertinents d’un corpus.','Accès à la connaissance.','La pertinence dépend des requêtes et des droits d’accès.','rag');
n('vector','retrieval','Index vectoriels','Indexer des représentations pour retrouver des voisins similaires.','Recherche sémantique.','Le voisin le plus proche n’est pas toujours une preuve pertinente.','rag','vector database,FAISS,pgvector','technologie');
n('hybrid','retrieval','Recherche hybride','Combiner correspondance lexicale et similarité vectorielle.','Recherche documentaire.','Calibrer la fusion sur des requêtes représentatives.','rag,sk','BM25,hybrid search','architecture');
n('reranking','retrieval','Reranking','Réordonner des candidats avec une estimation plus précise de leur pertinence.','Améliorer le contexte d’un RAG.','Mesurer le gain au regard de la latence ajoutée.','rag,hf');
n('chunking','retrieval','Découpage documentaire','Diviser un corpus en unités adaptées à l’indexation et au contexte.','Préparer une base RAG.','Un mauvais découpage sépare les informations nécessaires.','rag','chunking');
g('knowledge','data','Représentation des connaissances','Exprimer des entités, relations et significations structurées.','Interopérabilité et raisonnement.','Le modèle doit être gouverné et actualisé.','rdf,ai');
n('kg','knowledge','Graphes de connaissances','Relier des entités avec des relations décrites.','Navigation et intégration sémantique.','La couverture et la fiabilité des relations doivent être suivies.','rdf,ai','knowledge graph,KG','architecture');
n('ontology','knowledge','Ontologies','Définir des concepts et relations avec une sémantique formelle.','Vocabulaire commun et inférence.','La maintenance et les divergences de sens exigent une gouvernance.','rdf,ai','OWL');
n('rdf','knowledge','RDF','Représenter des assertions sous forme de triplets sujet-prédicat-objet.','Échange de données liées.','RDF représente l’information sans garantir sa vérité.','rdf','linked data','technologie');

g('frameworks','ops','Frameworks & outillage','Bibliothèques et plateformes pour construire des modèles et applications.','Accélérer l’implémentation.','Vérifier la compatibilité, les licences et le cycle de maintenance.','torch,hf,mlflow');
n('pytorch','frameworks','PyTorch','Bibliothèque de tenseurs et de différentiation automatique pour réseaux neuronaux.','Entraînement et expérimentation.','Reproductibilité et configuration matérielle doivent être maîtrisées.','torch','torch','technologie');
n('sklearn','frameworks','scikit-learn','Bibliothèque de modèles, transformations et outils d’évaluation en Python.','Apprentissage sur données structurées.','Les pratiques de validation restent à définir par l’équipe.','sk','sklearn','technologie');
n('hftransformers','frameworks','Hugging Face Transformers','Bibliothèque de définitions et d’exploitation de modèles préentraînés.','Applications texte, vision et audio.','Valider chaque modèle et sa licence.','hf','transformers library','technologie');
n('hfdiffusers','frameworks','Hugging Face Diffusers','Bibliothèque de pipelines de diffusion préentraînés.','Génération d’images, de vidéo ou d’audio.','Valider ressources nécessaires et usages autorisés.','diffusers','diffusers library','technologie');
n('mlflow','frameworks','MLflow','Plateforme de suivi et de gestion du cycle de vie des systèmes IA.','Expériences, versions et exploitation.','Un outil de suivi ne définit pas la gouvernance de l’équipe.','mlflow','model registry','technologie');
g('inference','ops','Calcul & inférence','Exécuter efficacement les modèles et gérer les ressources de calcul.','Service prédictif ou génératif.','Arbitrer débit, latence, qualité et consommation.','vllm,torch');
n('accelerator','inference','Accélérateurs & calcul distribué','Répartir les calculs sur des unités adaptées et plusieurs dispositifs.','Entraînement de grands modèles.','Les communications et la mémoire peuvent devenir limitantes.','torch','GPU,TPU,NPU,FSDP','technologie');
n('quantization','inference','Quantification','Réduire la précision numérique des représentations du modèle.','Diminuer mémoire et coût d’inférence.','Mesurer la perte de qualité sur les usages réels.','quant,vllm','INT8,INT4');
n('distillation','inference','Distillation','Entraîner un modèle à reproduire certains comportements d’un autre.','Déployer un modèle plus compact.','Le transfert peut conserver des erreurs du modèle enseignant.','hf,torch');
n('vllm','inference','vLLM','Moteur d’inférence et de service conçu pour les modèles de langage.','Servir plusieurs requêtes LLM.','La performance dépend du matériel et de la charge.','vllm','PagedAttention','technologie');
n('edge','inference','IA embarquée & edge','Exécuter un système IA près des sources de données ou sur un appareil.','Traitement local à faible latence.','Les contraintes matérielles limitent les modèles disponibles.','torch','edge AI,on-device','architecture');
g('lifecycle','ops','MLOps & LLMOps','Organiser la livraison, les versions et le suivi des systèmes IA.','Industrialisation durable.','Le cycle de vie inclut données, modèles et usages.','mlflow,nist');
n('experiments','lifecycle','Suivi d’expériences','Enregistrer paramètres, données de référence, artefacts et mesures.','Comparer et reproduire des essais.','Les comparaisons nécessitent des conditions équivalentes.','mlflow');
n('registry','lifecycle','Registre & versionnement','Gérer les versions des modèles et leurs états de validation.','Traçabilité des déploiements.','Versionner aussi données, prompts et configurations pertinents.','mlflow','model registry');
n('monitoring','lifecycle','Surveillance & dérive','Suivre qualité, données et comportement après déploiement.','Détecter les dégradations.','Les mesures de dérive ne remplacent pas l’évaluation des résultats.','mlflow,nist','drift,observability');
n('deployment','lifecycle','Déploiement & intégration','Exposer un modèle dans un service et son environnement opérationnel.','Intégration au système d’information.','Prévoir retour arrière, contrôle d’accès et objectifs de service.','mlflow,vllm','API,serving','architecture');

g('evaluation','trust','Évaluation des performances','Mesurer la qualité sur des tâches et scénarios représentatifs.','Décider de l’aptitude à l’usage.','Un score isolé peut cacher des échecs critiques.','metrics,nist');
n('validation','evaluation','Validation & généralisation','Tester sur des données séparées de l’apprentissage.','Estimer la performance future.','Respecter les structures temporelles et les groupes de données.','sk,metrics','cross-validation');
n('precision','evaluation','Précision, rappel & F1','Mesurer différents aspects des erreurs de classification.','Choisir un seuil adapté.','Le compromis dépend du coût métier des erreurs.','metrics','precision,recall,F1');
n('calibration','evaluation','Calibration & incertitude','Évaluer si les probabilités annoncées correspondent aux fréquences observées.','Décisions avec niveau de confiance.','La calibration peut changer avec le contexte.','sk,metrics');
n('geneval','evaluation','Évaluation des systèmes génératifs','Mesurer fidélité, utilité, respect des consignes et défaillances.','Acceptation d’un assistant.','Combiner scénarios métier, mesures et jugement humain.','nist,mlflow');
n('rageval','evaluation','Évaluation du RAG','Évaluer séparément la recherche et l’utilisation des documents.','Localiser les erreurs documentaires.','Une réponse citée peut mal interpréter sa source.','rag,nist');
g('security','trust','Sécurité & robustesse','Tester et contrôler les comportements en conditions adverses.','Limiter les impacts d’un détournement.','La sécurité concerne la chaîne applicative complète.','owasp,nist');
n('injection','security','Injection de prompt','Entrée cherchant à modifier indûment les instructions ou actions d’un système.','Modélisation des menaces.','Traiter les contenus externes comme non fiables.','owasp','prompt injection','risque');
n('hallucination','security','Hallucinations & confabulations','Contenus générés faux ou non étayés, parfois présentés avec assurance.','Définir des contrôles de fidélité.','Une citation ou un ton confiant ne prouve pas la véracité.','nist,owasp','confabulation','risque');
n('poisoning','security','Empoisonnement des données','Altération malveillante des données pour influencer un système.','Sécuriser les sources et entraînements.','Contrôler provenance et changements de corpus.','owasp','data poisoning','risque');
n('redteam','security','Tests adversariaux','Explorer activement des scénarios de contournement ou de défaillance.','Identifier des faiblesses avant et après déploiement.','Des tests réussis ne garantissent pas l’absence de vulnérabilités.','owasp,nist','red teaming');
n('guardrails','security','Garde-fous applicatifs','Appliquer des validations, permissions et limites autour du modèle.','Borner entrées, sorties et actions.','Aucun contrôle unique ne couvre tous les risques.','owasp,mcp','guardrails');
g('governance','trust','Gouvernance & responsabilité','Attribuer les décisions et définir politiques, risques et contrôles.','Piloter le portefeuille des usages IA.','Une politique doit se traduire en pratiques observables.','nist');
n('fairness','governance','Équité & biais','Évaluer les effets différenciés et les biais pertinents au contexte.','Examiner l’impact sur des populations.','Les définitions d’équité peuvent être incompatibles entre elles.','nist','fairness,bias');
n('explain','governance','Explicabilité & interprétabilité','Rendre certains aspects d’un résultat ou d’un modèle compréhensibles.','Appui à la décision et à l’audit.','Une explication locale ne prouve pas la causalité.','nist,sk','XAI,SHAP,LIME');
n('human','governance','Supervision humaine','Définir quand et comment une personne examine ou autorise une action.','Contrôler des décisions sensibles.','La supervision doit être possible, informée et effective.','nist','human in the loop,HITL');
n('privacy','governance','Confidentialité & accès','Limiter l’exposition des données et l’accès aux informations et actions.','Protection des corpus et conversations.','Appliquer les droits dans les systèmes sources et les index.','nist,owasp','privacy,access control');
n('airmf','governance','NIST AI RMF','Cadre volontaire structuré autour de Govern, Map, Measure et Manage.','Organisation de la gestion des risques.','Ce cadre ne constitue pas à lui seul une conformité juridique.','nist','risk management','référentiel');

n('federated','paradigms','Apprentissage fédéré','Entraîner un modèle avec des données conservées sur plusieurs participants et des mises à jour agrégées.','Coopération sur données distribuées.','Les mises à jour peuvent encore révéler des informations ; la confidentialité exige des contrôles complémentaires.','federated','federated learning');
n('ssm','neural','Modèles à espaces d’état','Modéliser une séquence via des états internes mis à jour, avec des variantes sélectives comme Mamba.','Traitement de longues séquences.','Les propriétés et performances varient selon l’architecture et la tâche.','ssm','SSM,Mamba','architecture');
n('vae','foundation','Autoencodeurs variationnels','Apprendre une représentation latente probabiliste et un décodeur permettant reconstruction et génération.','Représentations et synthèse de données.','L’approximation de la distribution latente influence la qualité.','vae','VAE,variational autoencoder');
g('recommendation','ml','Recommandation & ranking','Estimer la pertinence relative d’éléments pour une requête, un contexte ou une personne.','Prioriser des contenus ou des suggestions.','Les historiques d’interaction peuvent renforcer des biais d’exposition.','rec');
n('recsys','recommendation','Systèmes de recommandation','Combiner des signaux utilisateurs, éléments et contextes pour proposer des candidats pertinents.','Personnalisation des parcours.','Évaluer la diversité et la pertinence au-delà du taux de clic.','rec','recommender systems,RecSys');
n('collaborative','recommendation','Représentations utilisateurs-items','Apprendre des représentations d’utilisateurs et d’éléments à partir d’interactions.','Prédire la pertinence d’une recommandation.','Les nouveaux utilisateurs ou éléments posent un problème de démarrage à froid.','rec','collaborative filtering,filtrage collaboratif');
n('torchrec','frameworks','TorchRec','Bibliothèque PyTorch pour construire et distribuer des modèles de recommandation basés sur les embeddings.','Tables d’embeddings et recommandation à grande échelle.','La distribution des tables exige de maîtriser mémoire et communications.','rec','recsys framework','technologie');

const relationTypes={hierarchy:{label:'Contient',color:'#a9a6af',dash:'',description:'Classement pédagogique, du parent vers l’enfant.'},uses:{label:'Utilise',color:'#8b68b5',dash:'',description:'Peut mobiliser cette méthode ou technologie.'},enables:{label:'Soutient',color:'#5a8b74',dash:'',description:'Contribue à une capacité, sans la garantir.'},evaluates:{label:'Évalue',color:'#b88756',dash:'5 4',description:'Mesure ou examine ce système ou concept.'},controls:{label:'Encadre',color:'#bb7976',dash:'3 4',description:'Contrôle ou atténue un risque associé.'}};
const edges=nodes.filter(x=>x.parent).map(x=>({from:x.parent,to:x.id,type:'hierarchy',note:'Classement pédagogique principal. D’autres appartenances sont possibles.',sources:x.sources,editorial:true}));
function e(from,to,type,note,src){edges.push({from,to,type,note,sources:(src||nodes.find(x=>x.id===from).sources.join(',')).split(','),editorial:true})}
const rels=[
['federated','neural','uses','Les participants peuvent entraîner des composants neuronaux locaux.','federated'],
['ssm','llm','enables','Les espaces d’état sont une autre base possible pour la modélisation du langage.','ssm'],
['vae','embedding','enables','L’encodeur apprend une représentation latente probabiliste.','vae'],
['recsys','embedding','uses','Les représentations apprises aident à estimer la pertinence.','rec'],
['torchrec','recsys','enables','La bibliothèque fournit les composants de modèles de recommandation.','rec'],
['privacy','federated','controls','Les données décentralisées nécessitent toujours des contrôles de confidentialité.','federated,nist'],
['dl','ml','enables','Les réseaux profonds sont des méthodes d’apprentissage automatique.','torch,sk'],
['gen','dl','uses','De nombreuses familles génératives modernes mobilisent des réseaux profonds.','hf,diffusion'],
['nlp','ml','uses','Les tâches linguistiques peuvent être apprises à partir de données.','hf'],
['vision','dl','uses','Les réseaux profonds soutiennent de nombreuses tâches de vision.','hf,torch'],
['neurosymbolic','logic','uses','Les règles peuvent être combinées aux représentations apprises.','ai'],
['neurosymbolic','neural','uses','Le composant neuronal apprend des représentations.','torch'],
['llm','transformers','uses','De nombreux LLM sont construits sur des Transformers.','hf,attention'],
['llm','autoregressive','uses','Les LLM génératifs courants peuvent prédire successivement les tokens.','hf'],
['llm','token','uses','La tokenisation fournit des unités d’entrée et de sortie.','hf'],
['llm','self','uses','Le préentraînement peut utiliser des cibles dérivées du corpus.','hf'],
['llm','foundationmodel','enables','Un LLM largement préentraîné peut servir de base à plusieurs tâches.','hf'],
['vlm','transformers','uses','Les architectures vision-langage peuvent mobiliser l’attention.','hf'],
['vlm','embedding','uses','Les représentations relient contenu visuel et langage.','hf'],
['contrastive','embedding','enables','L’objectif contraste les représentations correspondantes.','hf'],
['cnn','detection','enables','Les filtres convolutifs peuvent servir de socle à la détection.','torch'],
['cnn','segmentation','enables','Les représentations spatiales soutiennent la segmentation.','torch'],
['ocr','rag','enables','L’extraction rend les documents numérisés accessibles à la recherche.','hf,rag'],
['asr','summarize','enables','Une transcription peut être donnée à un système de synthèse.','hf'],
['embedding','vector','enables','Les vecteurs appris peuvent être indexés par similarité.','rag'],
['rag','llm','uses','Le générateur exploite un contexte documentaire retrouvé.','rag'],
['rag','retrieval','uses','Le système récupère des informations pertinentes.','rag'],
['rag','vector','uses','Un index vectoriel constitue un choix possible de recherche.','rag'],
['rag','chunking','uses','Des passages peuvent constituer les unités de recherche.','rag'],
['rag','reranking','uses','Un réordonnancement peut affiner les candidats.','rag'],
['rag','hybrid','uses','La recherche peut combiner plusieurs signaux de pertinence.','rag'],
['kg','ontology','uses','Une ontologie peut fournir un vocabulaire et une sémantique.','ai,rdf'],
['kg','rdf','uses','RDF est une représentation possible de graphes de connaissances.','rdf'],
['kg','bayes','enables','La connaissance structurée peut alimenter des modèles probabilistes distincts.','ai'],
['gnn','kg','uses','Un graphe de connaissances peut fournir une structure relationnelle.','ai,torch'],
['agentarch','llm','uses','Certains agents utilisent un modèle de langage pour proposer des actions.','mcp'],
['agentarch','rag','uses','Un agent documentaire peut rechercher un contexte externe.','rag,mcp'],
['agentplanning','planning','uses','La planification formelle est une option d’architecture.','ai'],
['tooluse','mcp','uses','MCP standardise une voie de connexion à des outils.','mcp'],
['memory','kg','uses','Un graphe peut représenter une mémoire structurée.','ai,rdf'],
['multiagent','agentplanning','uses','Les rôles et plans doivent être coordonnés.','ai'],
['robotics','rl','uses','Le renforcement peut apprendre une politique de contrôle.','rl'],
['robotics','vision','uses','La perception visuelle peut informer une action physique.','ai,torch'],
['slam','perception','uses','Les observations visuelles peuvent soutenir la localisation.','ai'],
['rlhf','rl','uses','Le comportement est ajusté via une optimisation par renforcement.','rl,dpo'],
['rlhf','llm','enables','L’alignement par préférences peut ajuster un modèle de langage.','dpo'],
['dpo','llm','enables','L’optimisation de préférences ajuste directement le modèle.','dpo'],
['finetune','transfer','uses','Le modèle réutilise des paramètres préappris.','hf'],
['finetune','lora','uses','LoRA est une option d’adaptation à faible nombre de paramètres.','lora'],
['finetune','labeling','uses','Les exemples ciblés requièrent une préparation cohérente.','hf,nist'],
['prompt','llm','enables','Les instructions guident les comportements attendus.','hf'],
['diffusion','neural','uses','Un réseau apprend un processus de débruitage.','diffusion'],
['gan','backprop','uses','Les composants neuronaux peuvent être entraînés par gradients.','gan'],
['hfdiffusers','diffusion','enables','La bibliothèque fournit des pipelines de diffusion.','diffusers'],
['hftransformers','llm','enables','La bibliothèque fournit des définitions et outils pour des LLM.','hf'],
['hftransformers','vlm','enables','Les modèles vision-langage sont une famille prise en charge.','hf'],
['pytorch','backprop','enables','La différentiation automatique calcule les gradients.','torch'],
['sklearn','supervised','enables','La bibliothèque implémente de nombreux estimateurs supervisés.','sk'],
['sklearn','clustering','enables','Des algorithmes de regroupement sont fournis.','cluster'],
['mlflow','experiments','enables','La plateforme suit des expériences et leurs artefacts.','mlflow'],
['mlflow','registry','enables','Le registre organise les versions des modèles.','mlflow'],
['vllm','llm','enables','Le moteur sert des modèles de langage.','vllm'],
['vllm','quantization','uses','Des formats quantifiés peuvent réduire les besoins de mémoire.','vllm'],
['quantization','edge','enables','Une précision réduite peut faciliter le déploiement local.','torch,hf'],
['distillation','edge','enables','Un modèle compact peut rendre une exécution embarquée possible.','torch'],
['accelerator','training','enables','Le calcul parallèle peut accélérer l’entraînement.','torch'],
['features','supervised','enables','Des variables pertinentes soutiennent les modèles supervisés.','sk'],
['pipeline','validation','enables','Des transformations séparées correctement évitent des fuites.','sk'],
['provenance','registry','enables','L’origine des données participe à la traçabilité des versions.','mlflow,nist'],
['monitoring','deployment','evaluates','La surveillance examine le comportement en production.','mlflow,nist'],
['validation','supervised','evaluates','Des données séparées évaluent la généralisation.','metrics,sk'],
['precision','classification','evaluates','Ces métriques examinent les erreurs de classification.','metrics'],
['calibration','classification','evaluates','L’évaluation compare probabilités et observations.','sk,metrics'],
['geneval','llm','evaluates','Les scénarios testent qualité et défaillances du modèle.','nist'],
['rageval','rag','evaluates','Recherche et réponse doivent être évaluées distinctement.','rag,nist'],
['redteam','agentarch','evaluates','Les scénarios adverses explorent les actions et permissions.','owasp'],
['redteam','llm','evaluates','Les tests cherchent des comportements indésirables.','owasp'],
['guardrails','tooluse','controls','Valider les opérations et appliquer les permissions.','owasp,mcp'],
['guardrails','injection','controls','Des défenses applicatives peuvent réduire certains effets.','owasp'],
['human','agents','controls','Un humain peut examiner ou autoriser des étapes critiques.','nist'],
['privacy','rag','controls','Filtrer les informations selon les droits du demandeur.','owasp,nist'],
['privacy','memory','controls','Borner l’accès et la conservation des informations.','nist'],
['airmf','governance','enables','Les quatre fonctions structurent la gestion des risques.','nist'],
['fairness','classification','evaluates','Comparer les performances et impacts pertinents.','nist'],
['explain','trees','evaluates','La structure d’un arbre peut être examinée directement.','sk'],
['hallucination','llm','enables','Les modèles génératifs peuvent produire ce type de défaillance.','nist'],
['injection','tooluse','enables','Un détournement peut viser les opérations d’un agent.','owasp'],
['poisoning','dataprep','enables','Les sources de données constituent une surface d’attaque.','owasp']
];
// Risk-to-system relations express association, not a beneficial contribution.
for(const r of rels){if(['hallucination','injection','poisoning'].includes(r[0]))r[2]='uses';e(...r)}
// Prefer explicit threat semantics rather than conflating risks with functional dependencies.
relationTypes.risk={label:'Menace',color:'#bb7976',dash:'2 5',description:'Défaillance ou attaque pouvant affecter ce système.'};
for(const edge of edges)if(['hallucination','injection','poisoning'].includes(edge.from)&&edge.type!=='hierarchy')edge.type='risk';
const byId=new Map(nodes.map(x=>[x.id,x]));
for(const node of nodes){let p=node;let level=0;while(p.parent){level++;p=byId.get(p.parent)}node.level=level;let ancestor=node;while(ancestor.parent&&ancestor.parent!=='ai')ancestor=byId.get(ancestor.parent);node.domain=node.id==='ai'?'ai':ancestor.id;node.color=node.color||ancestor.color||'#7765c8'}
const result={updated:'2026-09-15',nodes,edges,relationTypes,sources:Object.fromEntries(Object.entries(sources).map(([id,s])=>[id,{id,publisher:s[0],title:s[1],url:s[2],type:s[3],checked:'2026-09-15'}])),methodology:'Synthèses originales. Hiérarchie et liens : interprétation pédagogique, étayée par les références affichées. Les liens « Utilise » désignent une possibilité, pas une dépendance universelle. Les exemples de technologies dans les synonymes ne sont pas des recommandations de produits.'};
await writeFile('public/data.json',JSON.stringify(result,null,2));
