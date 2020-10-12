interface ChacParameters {
  knowledge: number;
  hability: number;
  atitude: number;
  character: number;
}

interface Chac {
  knowledge: number;
  hability: number;
  atitude: number;
  character: number;
  technical_competence: number;
  comportamental_competence: number;
  status: string;
}

export default function chacFormula({
  knowledge,
  hability,
  atitude,
  character,
}: ChacParameters): Chac {
  let status = '';

  let technicalCompetence = knowledge + hability;

  if (technicalCompetence === 5) {
    technicalCompetence = 4.5;
  }

  let comportamentalCompetence = character + atitude;

  if (comportamentalCompetence === 5) {
    comportamentalCompetence = 4.5;
  }

  if (technicalCompetence <= 4.5 && comportamentalCompetence <= 4.5) {
    status = 'DISPENSAR';
  }

  if (technicalCompetence <= 4.5 && comportamentalCompetence >= 5.5) {
    status = 'CAPACITAR';
  }

  if (technicalCompetence >= 5.5) {
    if (comportamentalCompetence >= 5.5 && comportamentalCompetence <= 6) {
      status = 'ANALISAR';
    }
  }

  if (technicalCompetence >= 5.5) {
    if (comportamentalCompetence >= 6.5 && comportamentalCompetence <= 7) {
      status = 'VALIDAR';
    }
  }

  if (technicalCompetence >= 5.5) {
    if (comportamentalCompetence >= 7.5 && comportamentalCompetence <= 8.5) {
      status = 'INVESTIR';
    }
  }

  if (technicalCompetence >= 5.5) {
    if (comportamentalCompetence >= 9 && comportamentalCompetence <= 10) {
      status = 'PREMIAR';
    }
  }

  return {
    knowledge,
    hability,
    atitude,
    character,
    technical_competence: technicalCompetence,
    comportamental_competence: comportamentalCompetence,
    status,
  };
}
