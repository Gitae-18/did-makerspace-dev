// src/components/Topic.js

import React from 'react'

const Topic = ({ match }) => <h3>{match.params.topicId}</h3>

export default Topic