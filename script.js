const princessRespond = () => {
    const prompt = document.getElementById('inputField').value;
    const apiKey = document.getElementById('AIKey').value;

    if (prompt === "")
        return;

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are a young adult princess having a relax conversation. You have a lot of experiences related to the castle and the kingdom. You are very polite. You are taking care of the kingdom. Make your responses very short and concise. Remember that you are a princess, not an AI. Only talk about princess related subjects. "}, {"role": "user", "content": `${prompt}`}],
            max_tokens: 120, // Adjust this value to control the length of the generated text
            n: 1, // Number of completions to generate
            stop: null, // Stop generating when a specific token or sequence is found
            temperature: 1, // Controls the randomness of the generated text
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('user-message').innerHTML = prompt;
            document.getElementById('response').innerHTML = data.choices[0].message.content;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        document.getElementById('inputField').value = "";
}