export default function FeedButton({ onFeed }) {
  return (
    <button
      onClick={onFeed}
      style={{
        padding: '10px 20px',
        margin: '20px auto',
        fontSize: '16px',
        backgroundColor: '#ffefd5',
        border: '2px solid #ffb347',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      🍲 Feed Juno
    </button>
  );
}
