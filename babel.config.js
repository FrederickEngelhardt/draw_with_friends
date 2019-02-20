module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      '@babel/transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
}
