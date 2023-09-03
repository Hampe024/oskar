

export default function RecentPost({ author, txt, date }) {
    return (
        <div className="post">
            {author}
            <br />
            {txt}
            <br />
            {date}
            <br /><br />
        </div>
    )
}