export interface Survey {
    id: number;
    name: string;
    category: string;
    end_date: string;
    description: string;
}

export interface Answer {
    text: string;
    votes: number;
}

export interface Question {
    id: number;
    survey_id: number;
    question_text: string;
    answers: Answer[];
}