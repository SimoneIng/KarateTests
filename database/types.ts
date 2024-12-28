interface Athlete {
    athlete_id: number, 
    firstname: string, 
    lastname: string, 
    birthdate: Date, 
    athlete_group_id: number, 
}

interface AthleteGroup {
    athlete_group_id: number, 
    group_name: string, 
}

interface Exercize {

}

interface Test {

}

interface TestLogs {

}

export {
    Athlete, 
    AthleteGroup
}