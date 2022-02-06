class NeuralNetwork 
{
    constructor(model1 , input1, hidden1, output1) 
    {
      if (model1 instanceof tf.Sequential) 
      {
        this.model = model1;
        this.input_nodes = input1;
        this.hidden_nodes = hidden1;
        this.output_nodes = output1;
        console.log(this.input_nodes);
      } 
      else
      {
        this.input_nodes = model1;
        this.hidden_nodes = input1;
        this.output_nodes = hidden1;
        this.model = this.createModel();
      }
    }
  
    copy() 
    {
      return tf.tidy(() => 
      {
        const modelCopy = this.createModel();
        const weights = this.model.getWeights();
        const weightCopies = [];
        for (var i = 0; i < weights.length; i++) 
        {
          weightCopies[i] = weights[i].clone();
        }
        modelCopy.setWeights(weightCopies);
        return new NeuralNetwork(modelCopy,
          this.input_nodes,this.hidden_nodes,this.output_nodes);
      });
    }
  
    mutate(rate) {
      tf.tidy(() => 
      {
        const weights = this.model.getWeights();
        const mutatedWeights = [];
        for (var i = 0; i < weights.length; i++) 
        {
          var tensor = weights[i];
          var shape = weights[i].shape;
          var values = tensor.dataSync().slice();
          for (var j = 0; j < values.length; j++) 
          {
            if (random(1) < rate) 
            {
              var w = values[j];
              values[j] = w + randomGaussian();
            }
          }
          var newTensor = tf.tensor(values, shape);
          mutatedWeights[i] = newTensor;
        }
        this.model.setWeights(mutatedWeights);
      });
    }

    predict(inputs) 
    {
      return tf.tidy(() => 
      {
        const xs = tf.tensor2d([inputs]);
        const ys = this.model.predict(xs);
        const outputs = ys.dataSync();
        return outputs;
      });
    }
  
    createModel()
    {
      const model = tf.sequential();
      const hidden = tf.layers.dense
      ({units: this.hidden_nodes,
        inputShape: [this.input_nodes],
        activation: "relu"});
      model.add(hidden);
      const output = tf.layers.dense
      ({units: this.output_nodes,
        activation: "sigmoid"});
      model.add(output);
      return model;
    }
  }
