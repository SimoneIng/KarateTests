
interface Athlete {
    athlete_id: number, 
    firstname: string, 
    lastname: string, 
    birthdate: Date, 
    group_id: number, 
}

interface AthleteGroup {
    group_id: number, 
    group_name: string, 
}

interface TestType {
  enum_value: string, 
}

type ExercizeMetrics = string[]; 

interface Exercize {
  id: number, 
  name: string, 
  type: 'single' | 'double', 
  metric: string, 
  comparison: boolean
}

interface ExercizeWithReps extends Exercize {
  reps: number, 
}

interface ExercizeGroup {
  id: number, 
  title: string, 
  exercizes: ExercizeWithReps[] 
}


interface StandardTestValues {
    "Altezza": number;
    "Peso": number;
    "Flessibilità": {
      'In piedi': number;
      'Seduto': number;
    };
    "Rapidità": {
      'N mov skip 30sec': number, 
      'Sec 30 mov skip': number, 
      'N mov giaku 30sec': {
        "DX": number | null;
        "SX": number | null;
      };
      'Sec 30 mov giaku': {
        "DX": number | null;
        "SX": number | null;
      };
      'N mov mawashi 30sec': {
        "DX": number | null;
        "SX": number | null;
      };
      'Sec 30 mov mawashi': {
        "DX": number | null;
        "SX": number | null;
      };
    };
    "Esplosività": {
      "Stiffness": {
        'Prova 1': {
          "Minimo": number;
          "Massimo": number;
          'Tempo contatto': number;
        };
        'Prova 2': {
          "Minimo": number;
          "Massimo": number;
          'Tempo contatto': number;
        };
      };
      'Squat Jump': {
        'Prova 1': {
          "cmj": number;
          'cmj braccia libere': number;
        };
        'Prova 2': {
          "cmj": number;
          'cmj braccia libere': number;
        };
      };
    };
    'Navetta 8mt x 10': number;
}

interface Test {
  test_id: number, 
  test_date: string, 
  type: string, 
  test_values: StandardTestValues,
  athlete_id: number 
}

interface AthleteGroupWithAthletes {
  group_id: number, 
  group_name: string, 
  athletes: Athlete[], 
}

export {
    Athlete, 
    AthleteGroup,
    Test, 
    StandardTestValues,
    TestType, 
    ExercizeMetrics, 
    AthleteGroupWithAthletes,
    ExercizeGroup,
    Exercize, 
    ExercizeWithReps, 
}