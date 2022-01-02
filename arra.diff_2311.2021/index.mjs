
// region first task


//В примере кода: https://gist.github.com/aleksey-rezvov/82c6ac7f1cc18bc97ffc59021b030a43
// генерируется массив фиксаций состояния счета игры в течение матча,
// см. генерацию scoreStamps. Разработайте функцию getScore(offset),
// которая вернет счет на момент offset. Нужно суметь понять суть написанного кода,
// разработать функцию вписывающуюся стилем в существующий код,
// желательно адекватной алгоритмической сложности.



const emptyScoreStamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0
    }
};

export const scoreStamps = Array(50000).fill(emptyScoreStamp).map(
    ((acc) => () => {
            const scoreChanged = Math.random() > 0.9999;
            const homeScoreChange = scoreChanged && Math.random() > 0.55 ? 1 : 0;
            const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
            return {
                offset: acc.offset += Math.floor(Math.random() * 3) + 1,
                score: {
                    home: acc.score.home += homeScoreChange,
                    away: acc.score.away += awayScoreChange
                }
            };
        }
    )(emptyScoreStamp)
);

export const getScore = (offset : number) : {home: number, away: number} => {
    //This is  binary search
    let start=0, end=scoreStamps.length-1;
    let mid=0
    // Iterate while start not meets end
    while (start<=end){

        // Find the mid index
        mid=Math.floor((start + end)/2);

        // If element is present at mid, return score
        if (scoreStamps[mid].offset===offset){
             return scoreStamps[mid].score ;
        }
        // Else look in left or right half accordingly
        else if (scoreStamps[mid].offset <offset)
            start = mid + 1;
        else
            end = mid - 1;
    }
    // if we didn't find our element return the previous one
    return  scoreStamps[mid].score

}


 console.log(getScore(36445))



// endregion

//region second task
function csvJSON(csv){
// сначала мы достаем все строки
    let lines=csv.split("\n");
// потом мы достаем с первого рядка название колонок
    let headers=lines[0].split(";");
    // делаем все заголовки с малькой буквы
    headers= headers.map(c=>c.toLowerCase())
    // последнюю колонку переименовываем
    headers[2]="description"
    // делаем дистриктуризацию, чтобы было удобней работать
    const [title, author, description]=headers
    // создаем обект куда мы будев вписывать нашие данные
    const authors={
        "authors": []
    }
    // запускаем массив для обработки строк со второй строки(первая у нас уже есть)
    for(let i=1;i<lines.length;i++){
// создаем объект писатель
        let author = {};
        // делим полученную строку на колонки
        let currentLine=lines[i].split(";");
        // в нашем объекте писатель создаем необходимые поля и вставляем туда данные
        author={[author]:currentLine[1],'books':[]}
        author.books.push({
            [title]: currentLine[0],
            [description]: currentLine[2]
        })

        // вставляем нашего писателя в массив писателей и так перебираем все строки
        authors["authors"].push(author);
    }

    // возвращаем JSON
    return JSON.stringify(authors);
}

let str = "Title; Author; Annotation\n" +
    "Don Quixote; Miguel de Cervantes; Alonso Quixano, a retired country gentleman in his fifties\n" +
    "Crime and Punishment; Fyodor Dostoyevsky; It is a murder story, told from a murders point of view\n" +
    "The Odyssey; Homer; The Odyssey is one of two major ancient Greek epic poems attributed to Homer\n" +
    "The Brothers Karamazov; Fyodor Dostoyevsky; Dostoevsky's last and greatest novel, The Karamazov Brothers"

console.log(csvJSON(str))

//endregion