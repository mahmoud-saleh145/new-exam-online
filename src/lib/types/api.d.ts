declare type SuccessfulResponse<T> = {
    message: "success";

} & T;


declare type ErrorResponse = {
    message: string;
    code: number;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

declare type MetaData = {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

declare type PaginatedResponse<T> = {
    metaData: MetaData;
    [key: string]: T;
}

declare type Subjects = {
    _id: string,
    name: string,
    icon: string,
}

declare type Exams = {
    _id: string,
    title: string,
    duration: number,
    subject: string,
    numberOfQuestions: number,
    active: boolean,
}


declare type Answer = {
    answer: string
    key: string
    index:number
}

declare type QuestionResponse<T> = {
    [key: string]: T;
}

declare type Questions = {
    answers: Answer
    correct: string,
    exam: Exams,
    question: string,
    subject: Subjects,
    type: string,
    _id: string,

}

declare type Selected = {
    answer: Answer
    index: number

}







