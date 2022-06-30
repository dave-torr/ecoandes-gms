import { fetchPostJSON } from '../../utils/payments/api-helpers'
import React, { useState, useEffect } from 'react'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import styles from "./../../styles/stripeStyles.module.css";